const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(xss());
  app.use(cookieParser('mySecret'));
  app.use(csurf({ cookie: true }));

  app.use((req, res, next) => {
    res.cookie('csrfToken', req.csrfToken());
    next();
  });
};
