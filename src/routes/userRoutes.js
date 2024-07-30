const router = require('express').Router();
const usersController = require('../controllers/userController');

router.get('/', usersController.listUsers);

module.exports = router;
