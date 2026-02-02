import Veiculo from "../models/Veiculo.js";
import { veiculos } from "../data/cars.js";

export const getVeiculos = () => veiculos;

const listarVeiculos = (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder || "asc";

    const pageNumber = Math.max(1, page);
    const limitNumber = Math.max(1, Math.min(100, limit));

    const camposValidos = [
      "id",
      "placa",
      "chassi",
      "renavam",
      "modelo",
      "marca",
      "ano",
    ];
    const campoOrdenacao = camposValidos.includes(sortBy) ? sortBy : "id";
    const ordem = sortOrder.toLowerCase() === "desc" ? "desc" : "asc";

    let veiculosOrdenados = [...veiculos];

    veiculosOrdenados.sort((a, b) => {
      let valorA = a[campoOrdenacao];
      let valorB = b[campoOrdenacao];

      if (typeof valorA === "string") {
        valorA = valorA.toLowerCase();
        valorB = valorB.toLowerCase();
      }

      if (valorA < valorB) {
        return ordem === "asc" ? -1 : 1;
      }
      if (valorA > valorB) {
        return ordem === "asc" ? 1 : -1;
      }
      return 0;
    });

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const totalItems = veiculosOrdenados.length;

    const totalPages = Math.ceil(totalItems / limitNumber);

    const paginatedVeiculos = veiculosOrdenados.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedVeiculos,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalItems: totalItems,
        totalPages: totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
      sort: {
        sortBy: campoOrdenacao,
        sortOrder: ordem,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar veículos",
      error: error.message,
    });
  }
};

const novoId = (req, res) => {
  try {
    const maxId = veiculos.reduce(
      (max, veiculo) => Math.max(max, veiculo.id),
      0,
    );

    res.json({
      id: maxId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar ids",
      error: error.message,
    });
  }
};

const buscarVeiculoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = veiculos.find((v) => v.id === Number.parseInt(id, 10));

    if (!veiculo) {
      return res.status(404).json({
        success: false,
        message: "Veículo não encontrado",
      });
    }

    res.json({
      success: true,
      data: veiculo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar veículo",
      error: error.message,
    });
  }
};

const criarVeiculo = (req, res) => {
  try {
    const { id, placa, chassi, renavam, modelo, marca, ano } = req.body;

    const novoVeiculo = new Veiculo(
      id,
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      Number.parseInt(ano, 10),
    );

    const erros = Veiculo.validar(novoVeiculo);
    if (erros.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: erros,
      });
    }

    veiculos.push(novoVeiculo);

    res.status(201).json({
      success: true,
      message: "Veículo criado com sucesso",
      data: novoVeiculo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar veículo",
      error: error.message,
    });
  }
};

const atualizarVeiculo = (req, res) => {
  try {
    const { id } = req.params;
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;

    const indice = veiculos.findIndex((v) => v.id === Number.parseInt(id, 10));

    if (indice === -1) {
      return res.status(404).json({
        success: false,
        message: "Veículo não encontrado",
      });
    }

    const placaExistente = veiculos.find(
      (v) => v.placa === placa && v.id !== Number.parseInt(id, 10),
    );
    const chassiExistente = veiculos.find(
      (v) => v.chassi === chassi && v.id !== Number.parseInt(id, 10),
    );
    const renavamExistente = veiculos.find(
      (v) => v.renavam === renavam && v.id !== Number.parseInt(id, 10),
    );

    if (placaExistente) {
      return res.status(400).json({
        success: false,
        message: "Já existe outro veículo cadastrado com esta placa",
      });
    }

    if (chassiExistente) {
      return res.status(400).json({
        success: false,
        message: "Já existe outro veículo cadastrado com este chassi",
      });
    }

    if (renavamExistente) {
      return res.status(400).json({
        success: false,
        message: "Já existe outro veículo cadastrado com este renavam",
      });
    }

    const veiculoAtualizado = {
      ...veiculos[indice],
      placa: placa || veiculos[indice].placa,
      chassi: chassi || veiculos[indice].chassi,
      renavam: renavam || veiculos[indice].renavam,
      modelo: modelo || veiculos[indice].modelo,
      marca: marca || veiculos[indice].marca,
      ano: ano ? Number.parseInt(ano, 10) : veiculos[indice].ano,
    };

    const erros = Veiculo.validar(veiculoAtualizado);
    if (erros.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: erros,
      });
    }

    veiculos[indice] = veiculoAtualizado;

    res.json({
      success: true,
      message: "Veículo atualizado com sucesso",
      data: veiculoAtualizado,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar veículo",
      error: error.message,
    });
  }
};

// Deletar veículo
const deletarVeiculo = (req, res) => {
  try {
    const { id } = req.params;
    const indice = veiculos.findIndex((v) => v.id === Number.parseInt(id, 10));

    if (indice === -1) {
      return res.status(404).json({
        success: false,
        message: "Veículo não encontrado",
      });
    }

    const veiculoRemovido = veiculos.splice(indice, 1)[0];

    res.json({
      success: true,
      message: "Veículo deletado com sucesso",
      data: veiculoRemovido,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao deletar veículo",
      error: error.message,
    });
  }
};

export {
  listarVeiculos,
  buscarVeiculoPorId,
  criarVeiculo,
  atualizarVeiculo,
  deletarVeiculo,
  novoId,
};
