const User = require('../../models/User');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const deleteCost = async (req, res) => {
  const { userId } = req.user;
  const { costId } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.status(500).json({ message: 'User not found!' });

  try {
    const result = await user.deleteCost(costId);
    res.json({ result });
  } catch (e) {
    res.status(404).json({ message: `Cost with id ${costId} not found!` });
  }
};

module.exports = withStopReturnErrorHandler(deleteCost);
