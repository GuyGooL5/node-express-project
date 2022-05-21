const mongoose = require('mongoose');
const schemas = require('./schemas');

const User = mongoose.model('User', schemas.UserSchema);

const Cost = mongoose.model('Cost', schemas.CostSchema);

module.exports = {
  User,
  Cost,
};
