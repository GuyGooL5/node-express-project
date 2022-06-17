const mongoose = require("mongoose");
const User = require("../models/User");
const Report = require("../models/Report");


const getReport = async function (userObjectId, month, year) {
    const monthYear = combineMonthYear(month, year);
    let user;
    try {
        user = await User.findOne({_id: mongoose.Types.ObjectId(userObjectId)});
    } catch (e) {
        console.error("Failed to get report! Could not find user with given id: " + userObjectId);
        return;
    }

    const dbMonthReport = user.monthlyCosts && user.monthlyCosts.get(monthYear);
    let report;
    if (!dbMonthReport) {
        report = new Report(0, {}, 0, 0);
    } else {
        let sum = dbMonthReport.get('sum');
        let costs = dbMonthReport.get('costs');
        let costsLength = dbMonthReport.costs.length;
        let costsDailyAverage = dbMonthReport.sum / dbMonthReport.costs.length;
        report = new Report(sum, costs, costsLength, costsDailyAverage);
    }

    return report;
}

const combineMonthYear = function (month, year) {
    const newMonth = month.toString().length === 1 ? "0" + month : month;

    return newMonth + "_" + year;
}

module.exports = {
    getReport,
}