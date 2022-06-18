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

  const monthYear = getFormattedDate(cost.createdAt);

  await this.populate(`monthlyCosts.${monthYear}.costs`);

  const costs = this.monthlyCosts.get(monthYear)?.costs ?? [];
  costs.push(cost);

  const sum = costs.reduce((acc, curr) => acc + curr.price, 0);

  this.monthlyCosts.set(
    monthYear,
    new MonthCost({ sum, costs: costs.map((costItem) => costItem._id) }),
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

UserSchema.method('deleteCost', async function (costId) {
  const cost = await Cost.findById(costId);
  if (!cost) {
    throw new Error('Could not find cost to delete!');
  }

  const deleteResult = await Cost.deleteOne({ _id: cost._id }).catch((e) => {
    throw new Error('Could not delete cost!');
  });

  const monthYear = getFormattedDate(cost.createdAt);

  await this.populate(`monthlyCosts.${monthYear}.costs`);

  const costs = this.monthlyCosts.get(monthYear)?.costs ?? [];

  const filteredCosts = costs.filter(
    (costItem) => costItem._id.toString() !== costId,
  );

  const sum = filteredCosts.reduce((acc, curr) => acc + curr.price, 0);

  this.monthlyCosts.set(
    monthYear,
    new MonthCost({
      sum,
      costs: filteredCosts.map((costItem) => costItem._id),
    }),
  );

  try {
    await this.save();
  } catch {
    throw new Error(
      "Failed at adding cost to user's monthly costs! Failed at deleting cost from database!",
    );
  }

  return deleteResult;
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
