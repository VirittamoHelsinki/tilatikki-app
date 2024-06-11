const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

exports.createReservation = async (req, res) => {
  try {
    const { user, startTime, endTime, purpose, roomId, groupsize } = req.body;
    const newReservation = new Reservation({ user, startTime, endTime, purpose, room: roomId, groupsize });
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

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Remove reservation from the corresponding room
    await Room.findByIdAndUpdate(reservation.room, { $pull: { reservations: reservation._id } });

    // Delete the reservation
    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
