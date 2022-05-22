const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { hashPassword } = require('../utils/passwords');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, set: hashPassword },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  // TODO: Add enum for values
  maritalStatus: { type: String, required: true },
  costs: [{ type: mongoose.Types.ObjectId, ref: 'Cost' }],
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
  console.log('adding cost', cost, 'to', this.costs);
  this.costs.push(cost);
  return this.save();
});

UserSchema.method('checkPassword', async function (password) {
  // TODO: Add hashing
  return bcrypt.compare(password, this.password);
});

// Static Methods

UserSchema.statics.findById = function (id) {
  return this.findOne({ id });
};

UserSchema.statics.getCostsByObjectId = function (objectId) {
  return this.findById(objectId)
    .populate('costs')
    .exec()
    .then((user) => user.costs);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
