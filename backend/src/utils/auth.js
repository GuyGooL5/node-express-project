const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const hashPassword = (password) => bcrypt.hashSync(password, 10);

const generateToken = ({ userId }) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d', subject: userId });
};

module.exports = {
  hashPassword,
  generateToken,
};
