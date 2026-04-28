import express from 'express';
import crypto from "crypto";
import bcrypt from "bcrypt";
import transporter from "../services/mail.js";
import pool from '../config/db.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({message: "Usuário não encontrado" });
      }

      const user = result.rows[0];
      const token = crypto.randomBytes(32).toString("hex"); //Gerar token de recuperação
      const expires = new Date(Date.now() + 3600000); //Token expira em 1 hora

      await pool.query(
        "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3",
        [token, expires, user.id]
      );

       // ENVIAR E-MAIL DE RECUPERAÇÃO
  const link = `http://localhost:5173/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Recuperação de senha - g",
    html: `<p>Clique no link para redefinir sua senha:</p>
           <a href="${link}">${link}</a>`,
  });
  
      res.json({ message: "E-mail de recuperação enviado com sucesso" });
  
    } catch (err) {
      res.status(500).json({
        message: "Erro no servidor",
      });
  });

  // RESETAR SENHA
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const result = await pool.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_expires > NOW()",
      [token]
    );
  
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }
  
    const user = result.rows[0];
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await pool.query(
      "UPDATE users SET password=$1, reset_token=NULL, reset_expires=NULL WHERE id=$2",
      [hashedPassword, user.id]
    );
  
    res.json({ message: "Senha atualizada com sucesso." });
  });
  
  export default router;