const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  buildings: [{ type: Schema.Types.ObjectId, ref: 'Building' }]
  ,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const School = mongoose.model('School', schoolSchema);
module.exports = School;

