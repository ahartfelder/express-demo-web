const router = require('express').Router();

const rootRouter = require('../routes/rootRoutes');
const userRouter = require('../routes/userRoutes');

router.use('/', rootRouter);
router.use('/users', userRouter);

module.exports = router;
