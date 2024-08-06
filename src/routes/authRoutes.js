const router = require('express').Router();

const {
  getLoginController,
  postLoginController,
  postRegisterController,
  getRegisterController,
} = require('../controllers/authController');

router.route('/login').get(getLoginController).post(postLoginController);

router
  .route('/register')
  .get(getRegisterController)
  .post(postRegisterController);

module.exports = router;
