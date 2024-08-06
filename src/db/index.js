const { Pool } = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const config = require('../config/config');

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

const appSession = expressSession({
  store: new pgSession({
    pool,
    createTableIfMissing: true,
  }),
  secret: config.PG_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
  appSession,
};
