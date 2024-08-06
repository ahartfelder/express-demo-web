const path = require('path');
const express = require('express');

const { server, configViews } = require('./utils');
const routes = require('./routes');
const {
  loggerMiddleware,
  errorHandlerMiddleware,
  securityConfig,
} = require('./middlewares');

const app = express();

// Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security Middleware
securityConfig(app);

// Config Views
configViews(app);

app.use(loggerMiddleware);

// Static Files
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(routes);

app.use(errorHandlerMiddleware);

server(app);
