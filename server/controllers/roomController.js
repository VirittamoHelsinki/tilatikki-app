const Room = require('../models/Room');
const Floor = require('../models/Floor');
const Reservation = require('../models/Reservation')
const mongoose = require('mongoose')
const dayjs = require('dayjs');

exports.createRoom = async (req, res) => {
  try {
    const { number, capacity, reservations, floorId } = req.body;

    // Create a new room with the floorId
    const newRoom = new Room({ number, capacity, floor: floorId });
    const room = await newRoom.save();

    // If there are reservations, find and update them
    if (reservations && reservations.length > 0) {
      for (const reservationId of reservations) {
        await Reservation.findByIdAndUpdate(reservationId, { room: room._id });
      }
    }

    // Add room to the corresponding floor
    await Floor.findByIdAndUpdate(floorId, { $push: { rooms: room._id } });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('reservations');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTotalPeopleReserved = async (req, res) => {
  const roomId = req.params.roomId;
  const { date, startTime, endTime } = req.query;

  try {
    // Ensure the roomId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ error: 'Invalid room ID' });
    }

    // Parse the date
    const reservationDate = dayjs(date).startOf('day').toDate();

    // Validate start and end times
    const isValidTime = (time) => /^[0-9]{2}:[0-9]{2}$/.test(time);
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return res.status(400).json({ error: 'Invalid time format' });
    }

    // Use aggregation to look up reservations and sum the groupsize for the given room, date, and time range
    const result = await Room.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(roomId) }
      },
      {
        $lookup: {
          from: 'reservations',
          localField: 'reservations',
          foreignField: '_id',
          as: 'reservationDetails'
        }
      },
      { $unwind: '$reservationDetails' },
      {
        $match: {
          'reservationDetails.reservationDate': reservationDate,
          $or: [
            { 'reservationDetails.startTime': { $lte: endTime, $gte: startTime } },
            { 'reservationDetails.endTime': { $gte: startTime, $lte: endTime } },
            {
              $and: [
                { 'reservationDetails.startTime': { $lte: startTime } },
                { 'reservationDetails.endTime': { $gte: endTime } }
              ]
            }
          ]
        }
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: '$reservationDetails.groupsize' }
        }
      }
    ]);

    // Extract the total people count from the result
    const totalPeople = result.length > 0 ? result[0].totalPeople : 0;

    // Send the total people count as the response
    res.status(200).json({ totalPeople });
  } catch (err) {
    console.error('Error calculating total people reserved:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
