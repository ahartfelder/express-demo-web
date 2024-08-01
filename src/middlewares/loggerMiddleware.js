const logger = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
  if (!req.path.includes('/public/')) {
    const start = Date.now();
    let level = 'info';
    const standardMessage = `${req.method} ${req.url}`;

    logger.info(`Request: ${standardMessage}`);

    res.on('finish', () => {
      const duration = Date.now() - start;

      if (res.statusCode >= 400) level = 'error';

      logger[level](
        `Response: ${standardMessage} - ${res.statusCode} (${duration}ms)`
      );
    });
  }

  next();
};

module.exports = loggerMiddleware;
