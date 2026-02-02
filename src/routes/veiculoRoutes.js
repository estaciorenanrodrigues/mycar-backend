import express from 'express';
import * as veiculoController from '../controllers/veiculoController.js';
import { validateCar } from '../middleware/validateCar.js';

const router = express.Router();

router.get('/list', veiculoController.listarVeiculos);

router.get('/id', veiculoController.novoId);

router.get('/search/:id', veiculoController.buscarVeiculoPorId);

router.post('/create', veiculoController.criarVeiculo);

router.put('/update/:id', veiculoController.atualizarVeiculo);

router.delete('/delete/:id', veiculoController.deletarVeiculo);

export default router;