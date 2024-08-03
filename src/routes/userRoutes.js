const router = require('express').Router();
const usersController = require('../controllers/userController');

router
  .route('/')
  .get(usersController.listUsers)
  .post(usersController.createUser);

router.get('/:id', usersController.getUser);

module.exports = router;
