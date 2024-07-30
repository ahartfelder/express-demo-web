const router = require('express').Router();
const usersController = require('../controllers/userController');

router.get('/', usersController.listUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);

module.exports = router;
