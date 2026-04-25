import pool from '../config/db.js';

// LISTAR
export const getShelters = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shelters');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CRIAR
export const createShelter = async (req, res) => {
  const { name, address, city, capacity_total, capacity_available } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO shelters (name, address, city, capacity_total, capacity_available)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, address, city, capacity_total, capacity_available]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ATUALIZAR AS VAGAS
export const updateShelter = async (req, res) => {
    const { id } = req.params;
    const { capacity_total, capacity_available } = req.body;

    try {
      const result = await pool.query(
        `UPDATE shelters
         SET capacity_total = $1,
             capacity_available = $2
         WHERE id = $3
         RETURNING *`,
        [capacity_total, capacity_available, id]
      );

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// DELETAR abrigo
export const deleteShelter = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM shelters WHERE id = $1 RETURNING *',
      [id]
    );

// SE NAO ENCONTROU O ABRIGO
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Abrigo não encontrado'
        });
      }
  
      res.json({
        message: 'Abrigo deletado com sucesso',
        shelter: result.rows[0]
      });
  
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
};

// PATCH - atualizar vagas dinamicamente
export const updateAvailability = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body; // pode ser + ou -
  
// validação básica
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
  
    if (typeof change !== 'number') {
      return res.status(400).json({ message: 'change deve ser um número' });
    }
  
    try {
// 1. Buscar abrigo atual
      const shelterResult = await pool.query(
        'SELECT * FROM shelters WHERE id = $1',
        [id]
      );
  
      if (shelterResult.rows.length === 0) {
        return res.status(404).json({ message: 'Abrigo não encontrado' });
      }
  
      const shelter = shelterResult.rows[0];
  
// 2. Calcular novo valor
      const newAvailable = shelter.capacity_available + change;
  
// 3. Validações
      if (newAvailable < 0) {
        return res.status(400).json({
          message: 'Não pode ficar com vagas negativas'
        });
      }
  
      if (newAvailable > shelter.capacity_total) {
        return res.status(400).json({
          message: 'Não pode ultrapassar capacidade total'
        });
      }
  
// 4. Atualizar no banco
      const updated = await pool.query(
        `UPDATE shelters
         SET capacity_available = $1
         WHERE id = $2
         RETURNING *`,
        [newAvailable, id]
      );
  
      res.json(updated.rows[0]);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// 5. Atualizar no vagas

  export const updateVagas = async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE shelters
         SET capacity_available = capacity_available + $1
         WHERE id = $2
         AND capacity_available + $1 >= 0
         AND capacity_available + $1 <= capacity_total
         RETURNING *`,
        [change, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(400).json({
          message: 'Limite de vagas atingido ou valor inválido'
        });
      }

      res.json(result.rows[0]);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };