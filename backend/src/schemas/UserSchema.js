const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  marital_status: { type: String, required: true },
});
