const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  marital_status: { type: String, required: true },
  costs: [{ type: mongoose.Types.ObjectId, ref: 'Cost' }],
});

UserSchema.virtual('full_name')
  .get(function () {
    return `${this.first_name} ${this.last_name}`;
  })
  .set(function (full_name) {
    const [first_name, last_name] = full_name.split(' ');
    this.first_name = first_name;
    this.last_name = last_name;
  });

UserSchema.method('addCost', function (cost) {
  console.log('adding cost', cost, 'to', this.costs);
  this.costs.push(cost);
  return this.save();
});

module.exports = UserSchema;
