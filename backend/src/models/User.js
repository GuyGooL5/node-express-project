const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { hashPassword } = require('../utils/auth');

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  password: { type: String, required: true, set: hashPassword },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  // TODO: Add enum for values
  maritalStatus: { type: String, required: true },
  costs: [{ type: mongoose.Types.ObjectId, ref: 'costs' }],
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

UserSchema.method('getCosts', async function () {
  return this.populate('costs')
    .exec()
    .then((user) => user.costs);
});
// Static Methods

UserSchema.statics.findByIdNumber = function (idNumber) {
  return this.findOne({ idNumber });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
