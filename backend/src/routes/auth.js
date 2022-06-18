const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');
const User = require('../models/User');

const { generateToken } = require('../utils/auth');

const auth = async (req, res) => {
  const { sub } = req.user;
  const user = await User.findById(sub);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { password, costs, ...rest } = user.toObject();

  const token = generateToken({ userId: user._id.toString() });
  res.status(200).json({
    user:rest,
    token,
  });
};

module.exports = withStopReturnErrorHandler(auth);
