const router = require('express').Router();

const {
  listUsersController,
  getUserController,
} = require('../../controllers/userController');

router.get('/', listUsersController);
router.get('/:id', getUserController);

module.exports = router;
