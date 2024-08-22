const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const User = require("../models/User");

exports.createReservation = async (req, res) => {
  try {
    const {
      userId,
      reservationDate,
      reservationEndDate,
      reservationGroupId,
      startTime,
      endTime,
      purpose,
      roomId,
      groupsize,
      recurrence,
      additionalInfo,
    } = req.body;
    console.log("body: ", req.body);
    const newReservation = new Reservation({
      user: userId,
      reservationDate,
      reservationEndDate,
      reservationGroupId,
      startTime,
      endTime,
      purpose,
      room: roomId,
      groupsize,
      recurrence,
      additionalInfo,
    });
    const reservation = await newReservation.save();

    // Add reservation to the corresponding room
    await Room.findByIdAndUpdate(roomId, {
      $push: { reservations: reservation._id },
    });

    // Add reservation to the user's reservations
    await User.findByIdAndUpdate(userId, {
      $push: { reservations: reservation._id },
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate({
        path: "room",
        populate: {
          path: "reservations",
          populate: {
            path: "user",
          },
        },
      })
      .populate("user");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    console.log("reservationId: ", reservationId);

    const updatedReservationData = {
      purpose: req.body.purpose,
      reservationDate: req.body.reservationDate,
      reservationEndDate: req.body.reservationEndDate,
      reservationGroupId: req.body.reservationGroupId,
      groupsize: req.body.groupsize,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      recurrence: req.body.recurrence,
      additionalInfo: req.body.additionalInfo,
    };

    console.log("updatedReservationData: ", updatedReservationData);

    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updatedReservationData,
      { new: true, runValidators: true },
    );

    console.log("DOES THIs EXIST", reservation);

    if (!reservation) {
      console.log("RESERVATION NOT FOUND");
      return res(404).json({ message: "Reservation not found" });
    }

    console.log("SUCCESS");

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const reservations = await Reservation.find({ user: userId })
      .populate({
        path: "room",
        populate: {
          path: "reservations",
          populate: {
            path: "user",
          },
        },
      })
      .populate("user");

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for this user" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Remove reservation from the corresponding room
    await Room.findByIdAndUpdate(reservation.room, {
      $pull: { reservations: reservation._id },
    });

    // Delete the reservation
    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReservationByGroupId = async (req, res) => {
  try {
    // Find all reservations with the given reservationGroupId
    console.log("group id: ", req.params.id);
    const reservations = await Reservation.find({
      reservationGroupId: req.params.id,
    });

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for this group ID" });
    }

    // Loop through each reservation and perform necessary deletions
    for (const reservation of reservations) {
      // Remove reservation from the corresponding room
      await Room.findByIdAndUpdate(reservation.room, {
        $pull: { reservations: reservation._id },
      });

      // Remove reservation from the user's reservations
      await User.findByIdAndUpdate(reservation.user, {
        $pull: { reservations: reservation._id },
      });

      // Delete the reservation
      await Reservation.findByIdAndDelete(reservation._id);
    }

    res.status(200).json({ message: "Reservations deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservations by group ID:", error);
    res.status(500).json({ error: error.message });
  }
};
