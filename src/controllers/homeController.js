const homePage = (req, res) => {
  const locals = {
    title: 'Home Page',
    description: 'Welcome to the Home Page',
    extractStyles: true,
  };
  res.render('home', locals);
};

module.exports = {
  homePage,
};
