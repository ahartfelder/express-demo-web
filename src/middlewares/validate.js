const AppError = require('../utils/AppError');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new AppError('Validation failed', 400);
    }
    req.body = value;

    next();
  };
};

module.exports = validate;
