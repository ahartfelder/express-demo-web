const router = require('express').Router();

const {
  getLoginController,
  postLoginController,
  postRegisterController,
  getRegisterController,
  logoutController,
} = require('../controllers/authController');

router.route('/login').get(getLoginController).post(postLoginController);

router
  .route('/register')
  .get(getRegisterController)
  .post(postRegisterController);

router.get('/logout', logoutController);

module.exports = router;
