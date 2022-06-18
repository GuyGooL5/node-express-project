const mongoose = require('mongoose');

const MonthCostSchema = new mongoose.Schema(
  {
    sum: Number(),
    costs: [{ type: mongoose.Types.ObjectId, ref: 'Cost' }],
  },
  {
    autoCreate: false,
  },
);

const MonthCost = new mongoose.Model('MonthCost', MonthCostSchema);

module.exports = {
  MonthCost,
  MonthCostSchema,
};
