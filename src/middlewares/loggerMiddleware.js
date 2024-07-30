const loggerMiddleware = (req, res, next) => {
  const { method, url } = req;

  console.log(`[INFO] Incoming Request: ${method} ${url}`);

  res.on('finish', () => {
    console.log(
      `[INFO] Request Completed: ${method} ${url} - ${res.statusCode}`
    );
  });

  next();
};

const errorHandlerMiddleware = (err, req, res) => {
  const { method, url } = req;

  console.error(`[ERROR] ${method} ${url} - ${res.statusCode}\n${err.stack}`);

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal server error' });
};

module.exports = {
  loggerMiddleware,
  errorHandlerMiddleware,
};
