const router = require('express').Router();

const userRouter = require('./userRoutes');

router.use('/users', userRouter);

router.use('/blogs', (req, res) => {
  res.json('Hello World!');
});

module.exports = router;
