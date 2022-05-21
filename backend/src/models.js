const mongoose = require('mongoose');
const schemas = require('./schemas');

const UserModel = mongoose.model('User', schemas.UserSchema);

module.exports = {
  UserModel,
};
