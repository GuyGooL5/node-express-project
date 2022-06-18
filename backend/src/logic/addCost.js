const User = require('../models/User');
const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const { MonthCost } = require('../models/MonthCost');

const addCost = async ({ category, price, description, userObjectId }) => {
  const cost = new Cost({
    category,
    price,
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

  const { sum: prevSum, costs: prevCosts } = user.monthlyCosts
    .get(currMonthYear)
    ?.toJSON() ?? { sum: 0, costs: [] };

  const nextMonthlyCost = new MonthCost({
    sum: prevSum + addedCost.price,
    costs: [...prevCosts, addedCost._id],
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
