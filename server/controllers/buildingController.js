const Building = require('../models/Building');
const School = require('../models/School');

exports.createBuilding = async (req, res) => {
  try {
    const { name, schoolId } = req.body;
    const newBuilding = new Building({ name });
    const building = await newBuilding.save();

    // Add building to the corresponding school
    await School.findByIdAndUpdate(schoolId, { $push: { buildings: building._id } });

    res.status(201).json(building);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id).populate({
      path: 'floors',
      populate: {
        path: 'rooms',
        populate: {
          path: 'reservations'
        }
      }
    });
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

