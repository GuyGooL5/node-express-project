const User = require('../../models/User');
const { withStopReturnErrorHandler } = require('../../handlers/errorHandlers');

const getCosts = async (req, res) => {
  const { userId } = req.user;
  const { year, months } = req.query;

  if (months && !year)
    return res.status(400).json({ error: 'Year is required' });

  return res.json({ year, months });
  const user = await User.findById(userId);

  const costs = await user.getCosts();

  res.json({ costs });
};

module.exports = withStopReturnErrorHandler(getCosts);
