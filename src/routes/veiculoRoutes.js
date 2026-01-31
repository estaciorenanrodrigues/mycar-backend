import express from 'express';
import * as veiculoController from '../controllers/veiculoController.js';
import { validateCar } from '../middleware/validateCar.js';

const router = express.Router();

router.get('/', veiculoController.listarVeiculos);

router.get('/:id', veiculoController.buscarVeiculoPorId);

router.post('/', veiculoController.criarVeiculo);

router.put('/:id', veiculoController.atualizarVeiculo);

router.delete('/:id', veiculoController.deletarVeiculo);

export default router;