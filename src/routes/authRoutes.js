const router = require('express').Router();

const validate = require('../middlewares/validate');
const { loginSchema, registerSchema } = require('../utils/validationSchemas');

const {
  getLoginController,
  postLoginController,
  postRegisterController,
  getRegisterController,
  logoutController,
} = require('../controllers/authController');

router
  .route('/login')
  .get(getLoginController)
  .post(validate(loginSchema), postLoginController);

router
  .route('/register')
  .get(getRegisterController)
  .post(validate(registerSchema), postRegisterController);

router.get('/logout', logoutController);

module.exports = router;
