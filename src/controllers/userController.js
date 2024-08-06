const { getUserById, createUser, listUsers } = require('../db/queries/users');
const { encrypt } = require('../utils/bcrypt');

const listUsersController = async (req, res, next) => {
  try {
    const users = await listUsers();

    const locals = {
      title: 'Users List',
      description: 'This is users list',
      users,
    };
    res.render('users', locals);
  } catch (err) {
    next(err);
  }
};

const getUserController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (user) {
      const locals = {
        title: user.username,
        description: `User details for ${user.username}`,
        user,
      };

      res.render('user', locals);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await encrypt(password, 10);

    const newUser = await createUser(username, passwordHash);
    logger.info(newUser);
    res.redirect('/users');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserController,
  listUsersController,
  createUserController,
};
