const User = require('../../models/User');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const getCosts = async (req, res) => {
  const { userId } = req.user;
  const { year, month } = req.query;

  if (!month || !year)
    return res.status(400).json({ error: 'Month and year are required' });

  const user = await User.findById(userId);
  if (!user) return res.status(500).json({ error: 'User not found' });

  const monthlyCosts = await user.getMonthCosts({
    year: parseInt(year),
    month: parseInt(month),
  });

  res.json({ monthlyCosts, count: monthlyCosts.costs.length }); 
};

module.exports = withStopReturnErrorHandler(getCosts);
