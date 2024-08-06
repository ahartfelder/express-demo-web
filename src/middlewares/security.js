const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const { appSession } = require('../db');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(xss());
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.use(appSession);

  app.use((req, res, next) => {
    req.user = req.session.user || null;
    res.cookie('csrfToken', req.csrfToken());
    res.locals.csrfToken = req.cookies.csrfToken;
    next();
  });
};
