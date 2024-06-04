const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

exports.createReservation = async (req, res) => {
  try {
    const { user, startTime, endTime, purpose, roomId } = req.body;
    const newReservation = new Reservation({ user, startTime, endTime, purpose });
    const reservation = await newReservation.save();

    // Add reservation to the corresponding room
    await Room.findByIdAndUpdate(roomId, { $push: { reservations: reservation._id } });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

