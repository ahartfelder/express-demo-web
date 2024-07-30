const { default: axios } = require('axios');

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createUserAPI = async (user) => {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, createUserAPI };
