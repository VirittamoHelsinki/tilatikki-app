const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  purpose: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

