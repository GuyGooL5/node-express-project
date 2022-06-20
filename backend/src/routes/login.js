const User = require('../models/User');
const { generateToken, extractUserData } = require('../utils/auth');

const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findByIdNumber(username);
  if (!user?.checkPassword(password))
    return res.status(401).json({ error: 'Username or password is incorrect' });

  const token = generateToken({ userId: user?._id.toString() });
  const userData = extractUserData(user);
  res.status(200).json({ token, user: userData });
};

module.exports = withStopReturnErrorHandler(login);
