import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import veiculoRoutes from './routes/veiculoRoutes.js';
import { errorHandler, notFound } from './middleware/errors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', veiculoRoutes);
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

export default app;

