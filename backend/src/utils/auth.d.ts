const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const hashPassword = (password) => bcrypt.hashSync(password, 10);

interface IUserToken {
  userId: string;
}

export function generateToken(user: IUserToken): string;

