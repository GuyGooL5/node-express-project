const jwt = require('jsonwebtoken');

const env = require('../config/env');
const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');

const { JWT_SECRET } = env;

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {()=>void} next
 */
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.user = decoded;
    next();
  });
};

module.exports = withStopReturnErrorHandler(authenticate);
