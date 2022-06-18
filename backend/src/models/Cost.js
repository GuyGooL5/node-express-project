const mongoose = require('mongoose');

const CostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['food', 'transport', 'house', 'maintenance', 'other'],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true },
);

const Cost = mongoose.model('Cost', CostSchema);

module.exports = Cost;
