const logger = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
  if (!req.path.includes('/public/')) {
    let level = 'http';
    const start = Date.now();

    const childLogger = logger.child({
      method: req.method,
      protocol: req.protocol,
      host: req.hostname,
      path: req.path,
      query: req.query,
      // headers: req.headers,
      ip: req.ip,
    });

    childLogger[level]('REQUEST');

    res.on('finish', () => {
      if (res.statusCode >= 400) level = 'error';

      childLogger[level]({
        statusCode: res.statusCode,
        message: 'RESPONSE',
        duration: Date.now() - start,
      });
    });
  }

  next();
};

module.exports = loggerMiddleware;
