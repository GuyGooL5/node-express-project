const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MonthCost, MonthCostSchema } = require('./MonthCost');
const Cost = require('./Cost');

const { hashPassword } = require('../utils/auth');

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, set: hashPassword },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  maritalStatus: {
    type: String,
    required: false,
    enum: ['married', 'single', 'divorced', 'widowed'],
  },
  monthlyCosts: {
    type: Map,
    of: MonthCostSchema,
    default: () => new Map(),
  },
});

// Virtual Properties

UserSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (fullName) {
    const [firstName, ...rest] = fullName.split(' ');
    this.firstName = firstName;
    this.lastName = rest.join(' ');
  });

// Instance Methods

UserSchema.method('addCost', async function ({ category, price, description }) {
  const cost = new Cost({
    category,
    price,
    description,
    owner: this._id,
  });

  await cost.save().catch(() => {
    throw new Error('Could not add cost! Failed at saving cost.');
  });

  const currMonthYear = getFormattedDate(cost.createdAt);

  const { sum: prevSum, costs: prevCosts } = this.monthlyCosts
    .get(currMonthYear)
    ?.toJSON() ?? { sum: 0, costs: [] };

  this.monthlyCosts.set(
    currMonthYear,
    new MonthCost({
      sum: prevSum + cost.price,
      costs: [...prevCosts, cost._id],
    }),
  );

  await this.save().catch(() => {
    Cost.deleteOne({ _id: mongoose.Types.ObjectId(cost._id) })
      .then(() => {
        throw new Error("Failed at adding cost to user's monthly costs!");
      })
      .catch(() => {
        throw new Error(
          "Failed at adding cost to user's monthly costs! Failed at deleting cost from database!",
        );
      });
  });
  return cost.toJSON();
});

UserSchema.method('checkPassword', async function (password) {
  return bcrypt.compare(password, this.password);
});

UserSchema.method('getMonthCosts', async function ({ year, month }) {
  month = ('0' + month).slice(-2);
  const monthYear = `${month}_${year}`;

  const monthCostReport = this.monthlyCosts.get(monthYear);
  if (!monthCostReport) return { sum: 0, costs: [] };

  await this.populate(`monthlyCosts.${monthYear}.costs`);
  const { sum, costs } = monthCostReport.toJSON();

  return { sum, costs };
});

// Static Methods

UserSchema.statics.findByIdNumber = function (idNumber) {
  return this.findOne({ idNumber });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

const getFormattedDate = function (date) {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${month}_${year}`;
};
