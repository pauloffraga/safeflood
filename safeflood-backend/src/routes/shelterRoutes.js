import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// 🔥 ROTA PARA CRIAR ABRIGO
router.post("/", async (req, res) => {
  const { name, city, address, capacity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO shelters (name, city, address, capacity)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, city, address, capacity]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erro ao criar abrigo"
    });
  }
});

export default router;