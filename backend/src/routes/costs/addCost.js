const Cost = require('../../models/Cost');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const addCost = async (req, res) => {
  const { userId } = req.user;
  const { category, description, sum } = req.body;

  const cost = new Cost({
    owner: userId,
    category,
    description,
    sum,
  });

  const savedCost = await cost.save();

  res.json({ cost: savedCost });
};

module.exports = withStopReturnErrorHandler(addCost);
