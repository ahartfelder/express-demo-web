const router = require('express').Router();

const rootRouter = require('../routes/rootRoutes');
const authRouter = require('../routes/authRoutes');
const protectedRoutes = require('./protected/index');
const notFound = require('../middlewares/notFound');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.use('/', rootRouter);
router.use('/auth', authRouter);
router.use('/p', isAuthenticated, protectedRoutes);

router.use(notFound);

module.exports = router;
