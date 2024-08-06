const router = require('express').Router();

const {
  listUsersController,
  createUserController,
  getUserController,
} = require('../../controllers/userController');

router.route('/').get(listUsersController).post(createUserController);

router.get('/:id', getUserController);

module.exports = router;
