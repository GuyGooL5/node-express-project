const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MonthCostSchema } = require('./MonthCost');

const { hashPassword } = require('../utils/auth');

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
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

UserSchema.method('addCost', function (cost) {
  this.costs.push(cost);
  return this.save();
});

UserSchema.method('checkPassword', async function (password) {
  return bcrypt.compare(password, this.password);
});

UserSchema.method('getMonthCosts', async function (month, year) {
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
