import express from 'express';
import crypto from "crypto";
import bcrypt from "bcrypt";
import transporter from "../services/mail.js";
import pool from '../config/db.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// 🔑 FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await pool.query(
      "UPDATE users SET reset_token=$1, reset_token_expires=$2 WHERE id=$3",
      [token, expires, user.id]
    );

    const link = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
        to: email,
        subject: "Recuperação de senha - SafeFlood",
        html: `
        <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
      
            <div style="background: linear-gradient(90deg, #0077ff, #00c6ff); padding: 20px; text-align: center; color: white;">
              <h1 style="margin: 0;">🌊 SafeFlood</h1>
              <p style="margin: 5px 0 0;">Sistema de Monitoramento</p>
            </div>
      
            <div style="padding: 30px; color: #333;">
              <h2>Recuperação de Senha</h2>
              <p>Olá,</p>
              <p>Recebemos uma solicitação para redefinir sua senha.</p>
      
              <div style="text-align: center; margin: 30px 0;">
                <a href="${link}" 
                   style="background: #0077ff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   Redefinir Senha
                </a>
              </div>
      
              <p>Se o botão não funcionar:</p>
              <p style="word-break: break-all; color: #0077ff;">${link}</p>
      
              <p>Este link expira em 1 hora.</p>
            </div>
      
            <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
              <p>© 2026 SafeFlood</p>
            </div>
      
          </div>
        </div>
        `,
      });

    res.json({ message: "E-mail de recuperação enviado com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});


// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_token_expires > NOW()",
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    const user = result.rows[0];

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1, reset_token=NULL, reset_token_expires=NULL WHERE id=$2",
      [hashedPassword, user.id]
    );

    res.json({ message: "Senha atualizada com sucesso." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default router;