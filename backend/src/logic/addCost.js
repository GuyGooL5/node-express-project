const User = require('../models/User');
const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const { MonthCost } = require('../models/MonthCost');

const addCost = async ({ category, sum, description, userObjectId }) => {
  const cost = new Cost({
    category,
    sum,
    description,
    owner: mongoose.Types.ObjectId(userObjectId),
  });
  const addedCost = await cost.save().catch(() => {
    throw new Error('Could not add cost! Failed at saving cost.');
  });

  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(userObjectId),
  });

  const currMonthYear = getFormattedDate(addedCost.createdAt);

  const currMonthCost = user.monthlyCosts.get(currMonthYear);

  const nextMonthlyCost = new MonthCost({
    sum: (currMonthCost?.sum ?? 0) + addedCost.sum,
    costs: (currMonthCost?.costs ?? []).push(
      mongoose.Types.ObjectId(addedCost._id),
    ),
  });

  user.monthlyCosts.set(currMonthYear, nextMonthlyCost);

  user.save().catch(() => {
    Cost.deleteOne({ _id: mongoose.Types.ObjectId(addedCost._id) })
      .then(() => {
        throw new Error("Failed at adding cost to user's monthly costs!");
      })
      .catch(() => {
        throw new Error(
          "Failed at adding cost to user's monthly costs! Failed at deleting cost from database!",
        );
      });
  });
};

const getFormattedDate = function (date) {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${month}_${year}`;
};

module.exports = addCost;
