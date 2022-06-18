const mongoose = require('mongoose');
const User = require('../models/User');

const getReport = async function (userObjectId, month, year) {
  const monthYear = combineMonthYear(month, year);

  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(userObjectId),
  }).catch(() => {
    throw new Error(`Could not get user with id ${userObjectId}!`);
  });

  const dbMonthReport = user?.monthlyCosts?.get(monthYear);
  if (!dbMonthReport) return { sum: 0, costs: [] };

  const { sum, costs } = dbMonthReport.toJSON();

  return { sum, costs };
};

const combineMonthYear = function (month, fullYear) {
  month = ('0' + month).slice(-2);
  return `${month}_${fullYear}`;
};

module.exports = getReport;
