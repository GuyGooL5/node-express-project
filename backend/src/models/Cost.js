const mongoose = require('mongoose');
const User = require('./User');

const CostSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    sum: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true },
);

CostSchema.pre('save', async function (error, doc, next) {
  console.log({ error, doc, next });
  const user = await User.findOne({ _id: doc.owner });
  await user.addCost(doc.owner);
  if (error) return next(new Error('Cost already exists'));

  next();
});

const Cost = mongoose.model('Cost', CostSchema);

module.exports = Cost;
 