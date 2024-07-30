const AppError = require('../utils/AppError');
const { getUsers, createUserAPI } = require('../services/api');

const listUsers = async (req, res, next) => {
  try {
    const users = await getUsers();

    if (users.length) {
      const locals = {
        title: 'Users List',
        description: 'This is users list',
        // layout: 'layouts/custom-layout',
        users,
      };

      res.render('users', locals);
      return;
    }

    throw new AppError('No users', 404);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await createUserAPI(user);
    res.redirect('/users');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listUsers,
  createUser,
};
