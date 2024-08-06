require('dotenv-flow').config();

const {
  PG_SESSION_SECRET,
  PORT,
  DATABASE_URL,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

module.exports = {
  PG_SESSION_SECRET,
  PORT,
  DATABASE_URL,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
};
