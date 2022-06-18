const Cost = require('../../models/Cost');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const deleteCost = async (req, res) => {
  const { userId } = req.user;
  const { costId } = req.params;

  const result = await Cost.deleteOne({ _id: costId, owner: userId });
  
  res.json({ result });
};

module.exports = withStopReturnErrorHandler(deleteCost);
