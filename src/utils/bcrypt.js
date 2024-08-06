const bcrypt = require('bcrypt');

const encrypt = async (password) => bcrypt.hashSync(password, 10);

const validateHash = async (password, hash) =>
  bcrypt.compareSync(password, hash);

module.exports = { encrypt, validateHash };
