const logger = require('../utils/logger');

const errorHandlerMiddleware = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandlerMiddleware;
