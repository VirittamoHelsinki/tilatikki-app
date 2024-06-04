const Floor = require('../models/Floor');
const Building = require('../models/Building');

exports.createFloor = async (req, res) => {
  try {
    const { number, buildingId } = req.body;
    const newFloor = new Floor({ number });
    const floor = await newFloor.save();

    // Add floor to the corresponding building
    await Building.findByIdAndUpdate(buildingId, { $push: { floors: floor._id } });

    res.status(201).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFloorById = async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id).populate({
      path: 'rooms',
      populate: {
        path: 'reservations'
      }
    });
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

