const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  purpose: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  groupsize: {
    type: Number,
    required: true
  }

});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

