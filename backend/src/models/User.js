const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { hashPassword } = require('../utils/passwords');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  password: { type: String, required: true, set: hashPassword },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  marital_status: { type: String, required: true },
  costs: [{ type: mongoose.Types.ObjectId, ref: 'Cost' }],
});

// Virtual Properties

UserSchema.virtual('full_name')
  .get(function () {
    return `${this.first_name} ${this.last_name}`;
  })
  .set(function (full_name) {
    const [first_name, last_name] = full_name.split(' ');
    this.first_name = first_name;
    this.last_name = last_name;
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
