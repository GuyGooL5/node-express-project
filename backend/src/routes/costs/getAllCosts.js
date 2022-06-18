const User = require('../../models/User');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const getAllCosts = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  const costs = await user.getCosts();

  res.json({ costs });
};

module.exports = withStopReturnErrorHandler(getAllCosts);
