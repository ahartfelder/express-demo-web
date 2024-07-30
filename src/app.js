const express = require('express');
require('dotenv-flow').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

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
