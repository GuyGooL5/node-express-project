const { Cost, User } = require('../models');

const createCost = (user, { category, description, sum }) =>
  Cost.create({ owner: user._id, category, description, sum }).then(async (cost) => {
    console.log('cost created', cost);
    return user.addCost(cost);
  });

const getCostByObjectId = (objectId) => Cost.findById(objectId);
module.exports = {
  createCost,
  getCostByObjectId,
};
