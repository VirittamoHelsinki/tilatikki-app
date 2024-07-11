const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reservationDate: { type: Date, required: true },
  startTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  purpose: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  groupsize: {
    type: Number,
    required: true
  },
  recurrence: { type: String },
  additionalInfo: { type: String }

});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

