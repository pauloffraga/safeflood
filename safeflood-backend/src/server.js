import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shelterRoutes from './routes/shelterRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use(cors(({origin: '*' })));
app.use(express.json());

app.use('/shelters', shelterRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API SafeFlood rodando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});