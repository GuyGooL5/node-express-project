const Cost = require('../../models/Cost');

const addCostLogic = require('../../logic/addCost');

const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const addCost = async (req, res) => {
  const { userId } = req.user;
  const { category, description, price } = req.body;

  const cost = await addCostLogic({
    category,
    description,
    price,
    userObjectId: userId,
  });

  res.json({ cost });
};

module.exports = withStopReturnErrorHandler(addCost);
