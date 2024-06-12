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

exports.getTotalPeopleReserved = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    // Ensure the roomId is a valid ObjectId
    const roomObjectId = mongoose.Types.ObjectId(roomId);

    // Use aggregation to sum the groupsize for the given room
    const result = await Reservation.aggregate([
      { $match: { room: roomObjectId } }, // Match reservations for the specific room
      { $group: { _id: null, totalPeople: { $sum: '$groupsize' } } } // Sum the groupsize
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
