const { User } = require('../models');

const createUser = async ({ id, first_name, last_name, birthday, marital_status }) =>
  User.create({ id, first_name, last_name, birthday, marital_status });

const getUserById = (id) => User.findOne({ id });

const getUserByObjectId = (objectId) => User.findById(objectId);

const getCostsByUserId = (userId) =>
  User.findOne({ id: userId })
    .populate('costs')
    .exec()
    .then((user) => user.costs);

module.exports = {
  createUser,
  getUserById,
  getUserByObjectId,
  getCostsByUserId,
};
