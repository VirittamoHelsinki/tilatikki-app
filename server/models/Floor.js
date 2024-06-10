const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const floorSchema = new Schema({
  number: { type: Number, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  building: { type: Schema.Types.ObjectId, ref: 'Building' }
});

const Floor = mongoose.model('Floor', floorSchema);
module.exports = Floor;

