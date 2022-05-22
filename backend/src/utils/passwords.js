const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = {
  hashPassword,
};
