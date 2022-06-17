const User = require('../models/User');
const Cost = require('../models/Cost');
const mongoose = require("mongoose");


const addCost = async function (category, sum, description, userObjectId) {
    const cost = new Cost()
    cost.category = category
    cost.sum = sum
    cost.description = description
    cost.owner = mongoose.Types.ObjectId(userObjectId)

    await cost.save()


}


module.exports = {
    addCost,
}