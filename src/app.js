const path = require('path');
const express = require('express');
require('dotenv-flow').config();
const expressLayouts = require('express-ejs-layouts');

const userRoutes = require('./routes/userRoutes');
const { loggerMiddleware, errorHandlerMiddleware } = require('./middlewares');
const securityConfig = require('./middlewares/security');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
securityConfig(app);

// Config Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(loggerMiddleware);

// Static Files
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
  try {
    const locals = {
      title: 'Home Page',
      description: 'This is home page!',
    };
    res.render('index', locals);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandlerMiddleware);

// Server
const startServer = async () => {
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

startServer();
