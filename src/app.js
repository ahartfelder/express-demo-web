const path = require('path');
const express = require('express');
require('dotenv-flow').config();
const expressLayouts = require('express-ejs-layouts');

const userRoutes = require('./routes/userRoutes');
const {
  loggerMiddleware,
  errorHandlerMiddleware,
} = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  const locals = {
    title: 'Home Page',
    description: 'This is home page!',
  };

  res.render('index', locals);
});

app.use(errorHandlerMiddleware);

// Server
const startServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      app.listen(PORT, (err) => {
        if (err) return reject(err);
        console.log(`Listening on port ${PORT}`);
        resolve();
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
