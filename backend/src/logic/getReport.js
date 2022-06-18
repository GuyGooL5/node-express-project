const mongoose = require('mongoose');
const User = require('../models/User');

const getReport = async function (userObjectId, month, year) {
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(userObjectId),
  }).catch(() => {
    throw new Error(`Could not get user with id ${userObjectId}!`);
  });

  return user.getMonthCosts(month, year);
};


module.exports = getReport;
