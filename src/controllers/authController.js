const { getUserByUsername, createUser } = require('../db/queries/users');
const { validateHash, encrypt } = require('../utils/bcrypt');
const logger = require('../utils/logger');

const getLoginController = (req, res, next) => {
  try {
    const locals = {
      title: 'Login',
      description: 'Login Page',
      action: 'login',
    };

    res.render('form', locals);
  } catch (error) {
    next(error);
  }
};

const postLoginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (user && (await validateHash(password, user.password_hash))) {
      req.session.user = { id: user.id, username: user.username };
      return res.redirect('/');
    }

    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

const getRegisterController = (req, res, next) => {
  try {
    const locals = {
      title: 'Register',
      description: 'Register Page',
      action: 'register',
    };

    res.render('form', locals);
  } catch (error) {
    next(error);
  }
};

const postRegisterController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await encrypt(password, 10);

    const newUser = await createUser(username, passwordHash);
    req.session.user = { id: newUser.id, username: newUser.username };
    logger.info(newUser);
    res.redirect('/p/users');
  } catch (error) {
    next(error);
  }
};

const logoutController = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLoginController,
  postLoginController,
  getRegisterController,
  postRegisterController,
  logoutController,
};
