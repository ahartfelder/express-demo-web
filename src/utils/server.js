const config = require('../config/config');
const logger = require('./logger');

const PORT = config.PORT;

module.exports = async (app) => {
  try {
    await new Promise((resolve, reject) => {
      app.listen(PORT, (err) => {
        if (err) return reject(err);
        logger.info(`Listening on port ${PORT}`);
        resolve();
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};
