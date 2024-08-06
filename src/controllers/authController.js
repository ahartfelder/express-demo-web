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

const postLoginController = (req, res, next) => {
  try {
    console.log(req.body);
    res.send('Login approved');
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

const postRegisterController = (req, res, next) => {
  try {
    console.log(req.body);
    res.send('Register completed');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLoginController,
  postLoginController,
  getRegisterController,
  postRegisterController,
};
