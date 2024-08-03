const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  } catch (error) {
    throw error;
  }
};

const getUserId = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const createUserAPI = async (user) => {
  const { name, email } = user;
  try {
    const res = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, getUserId, createUserAPI };
