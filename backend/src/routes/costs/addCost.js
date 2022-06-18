const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');
const Cost = require('../../models/Cost');
const User = require('../../models/User');

const addCost = async (req, res) => {
  const { userId } = req.user;
  const { category, description, price } = req.body;

  const cost = new Cost({ category, description, price, owner: userId });

  try {
    await cost.save();
  } catch (e) {
    return res
      .status(400)
      .json({ error: `couldn't save cost. reason: ${e.message}` });
  }

  const user = await User.findById(userId);

  await user.addCost(cost);
  res.json({ cost });
};

module.exports = withStopReturnErrorHandler(addCost);
