const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');

module.exports = (app) => {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/layout');
  app.set('layout extractStyles', true);
  app.use(expressEjsLayouts);
};
