const User = require('../models/User');
const Cost = require('../models/Cost');
const mongoose = require("mongoose");
const {MonthCost} = require("../models/MonthCost");


const addCost = async function (category, sum, description, userObjectId) {
    const cost = new Cost();
    cost.category = category;
    cost.sum = sum;
    cost.description = description;
    cost.owner = mongoose.Types.ObjectId(userObjectId);
    let addedCost;
    try {
        addedCost = await cost.save();
    } catch (e) {
        console.error("Could not add cost! Failed at saving cost.");
        return;
    }

    const user = await User.findOne({_id: mongoose.Types.ObjectId(userObjectId)});

    const currMonthYear = getMonthYearFromDate(addedCost.createdAt);

    let userMc = user.monthlyCosts;;
    let currMc = userMc.get(currMonthYear);
    if (!currMc || currMc.sum === 0) {
        currMc = new MonthCost({
            sum: addedCost.sum,
            costs: [
                mongoose.Types.ObjectId(addedCost._id),
            ]
        });
    } else {
        currMc.sum = currMc.sum + addedCost.sum;
        currMc.costs.push(mongoose.Types.ObjectId(addedCost._id));
    }

    user.monthlyCosts.set(currMonthYear, currMc);
    try {
        const addedUser = await user.save();
    } catch (e) {
        console.error("Could not add cost! Failed at saving user.");
        try {
            Cost.deleteOne({_id: mongoose.Types.ObjectId(addedCost._id)});
        } catch (e) {
            console.error("Failed to delete added cost!");
        }
    }
}


const getMonthYearFromDate = function (date) {
    let splitDate = date.toLocaleString().split(',')[0].toString().split('/');
    return splitDate[1] + "_" + splitDate[2];
}

module.exports = {
    addCost,
}