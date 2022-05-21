const mongoose = require('mongoose');

const CostSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  sum: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = CostSchema;
