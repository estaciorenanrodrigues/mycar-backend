
export const validateCar = (req, res, next) => {

    const { placa, chassi, renavam } = req.body;

    const placaExistente = veiculos.find(v => v.placa === placa);
    const chassiExistente = veiculos.find(v => v.chassi === chassi);
    const renavamExistente = veiculos.find(v => v.renavam === renavam);

    if (placaExistente) {
        return res.status(400).json({
          success: false,
          message: 'Já existe um veículo cadastrado com esta placa'
        });
      }
  
      if (chassiExistente) {
        return res.status(400).json({
          success: false,
          message: 'Já existe um veículo cadastrado com este chassi'
        });
      }
  
      if (renavamExistente) {
        return res.status(400).json({
          success: false,
          message: 'Já existe um veículo cadastrado com este renavam'
        });
      }
};