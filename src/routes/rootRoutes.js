const router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    const locals = {
      title: 'Home Page',
      description: 'This is home page!',
      extractScripts: true,
      extractStyles: true,
      csrfToken: req.csrfToken(),
    };

    res.render('index', locals);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
