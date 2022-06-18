const Cost = require('../../models/Cost');

const addCostLogic = require('../../logic/addCost');

const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');
const User = require('../../models/User');

const addCost = async (req, res) => {
  const { userId } = req.user;
  const { category, description, price } = req.body;

  const user = await User.findById(userId);

  const cost = await user.addCost({
    category,
    description,
    price,
  });
  res.json({ cost });
};

module.exports = withStopReturnErrorHandler(addCost);
