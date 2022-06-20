const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');
const User = require('../models/User');

const { generateToken, extractUserData } = require('../utils/auth');

const auth = async (req, res) => {
  const { sub } = req.user;
  const user = await User.findById(sub);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const userData = extractUserData(user);

  const token = generateToken({ userId: user._id.toString() });
  res.status(200).json({
    user: userData,
    token,
  });
};

module.exports = withStopReturnErrorHandler(auth);
