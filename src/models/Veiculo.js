class Veiculo {
  constructor(id, placa, chassi, renavam, modelo, marca, ano) {
    this.id = id;
    this.placa = placa;
    this.chassi = chassi;
    this.renavam = renavam;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
  }

  static validar(veiculo) {
    const erros = [];

    if (!veiculo.placa || veiculo.placa.trim() === '') {
      erros.push('Placa é obrigatória');
    }

    if (!veiculo.chassi || veiculo.chassi.trim() === '') {
      erros.push('Chassi é obrigatório');
    }

    if (!veiculo.renavam || veiculo.renavam.trim() === '') {
      erros.push('Renavam é obrigatório');
    }

    if (!veiculo.modelo || veiculo.modelo.trim() === '') {
      erros.push('Modelo é obrigatório');
    }

    if (!veiculo.marca || veiculo.marca.trim() === '') {
      erros.push('Marca é obrigatória');
    }

    if (!veiculo.ano || veiculo.ano < 1900 || veiculo.ano > new Date().getFullYear() + 1) {
      erros.push('Ano inválido');
    }

    return erros;
  }
}

export default Veiculo;

