const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
  name: { type: String, required: true },
  floors: [{ type: Schema.Types.ObjectId, ref: 'Floor' }],
  school: { type: Schema.Types.ObjectId, ref: 'School' }

});

const Building = mongoose.model('Building', buildingSchema);
module.exports = Building;

