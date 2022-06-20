const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const generateToken = ({ userId }) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d', subject: userId });
};

const extractUserData = (user) => {
  const { idNumber, firstName, lastName, email, birthday, maritalStatus } =
    user.toObject();
  return { idNumber, firstName, lastName, email, birthday, maritalStatus };
};

module.exports = {
  hashPassword,
  generateToken,
  extractUserData,
};
