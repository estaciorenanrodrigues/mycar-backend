export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: err.message
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Recurso não encontrado'
  });
};

export default { errorHandler, notFound };