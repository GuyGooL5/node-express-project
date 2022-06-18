const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findByIdNumber(username);
  if (!user?.checkPassword(password))
    return res.status(401).json({ error: 'Username or password is incorrect' });

  const token = generateToken({ userId: user?._id.toString() });
  res.status(200).json({ token });
};

module.exports = withStopReturnErrorHandler(login);
