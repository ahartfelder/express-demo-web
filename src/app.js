const path = require('path');
const express = require('express');
require('dotenv-flow').config();

const { server, configViews } = require('./utils');
const routes = require('./routes');
const {
  loggerMiddleware,
  errorHandlerMiddleware,
  securityConfig,
} = require('./middlewares');

const app = express();

// Security Middleware
securityConfig(app);

// Config Views
configViews(app);

// Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(loggerMiddleware);

// Static Files
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(routes);

app.use(errorHandlerMiddleware);

server(app);
