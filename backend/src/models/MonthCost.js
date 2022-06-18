const mongoose = require('mongoose');

const MonthCostSchema = new mongoose.Schema(
  {
    sum: Number(),
    costs: [{ type: mongoose.Types.ObjectId, ref: 'Cost' }],
  },
  { autoCreate: false },
);

const MonthCost = mongoose.model('MonthCost', MonthCostSchema);

module.exports = {
  MonthCost,
  MonthCostSchema,
};
