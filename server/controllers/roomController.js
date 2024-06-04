const Room = require('../models/Room');
const Floor = require('../models/Floor');

exports.createRoom = async (req, res) => {
  try {
    const { number, capacity, floorId } = req.body;
    const newRoom = new Room({ number, capacity });
    const room = await newRoom.save();

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

