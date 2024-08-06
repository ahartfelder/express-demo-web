const db = require('../index');

const getUserById = async (userId) => {
  const text = 'SELECT * FROM users WHERE id = $1';
  const params = [userId];
  const res = await db.query(text, params);
  return res.rows[0];
};

const getUserByUsername = async (username) => {
  const text = 'SELECT * FROM users WHERE username = $1';
  const params = [username];
  const res = await db.query(text, params);
  return res.rows[0];
};

const createUser = async (username, passwordHash) => {
  const text =
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *';
  const params = [username, passwordHash];
  const res = await db.query(text, params);
  return res.rows[0];
};

const listUsers = async () => {
  const text = 'SELECT * FROM users';
  const res = await db.query(text);
  return res.rows;
};

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
  listUsers,
};
