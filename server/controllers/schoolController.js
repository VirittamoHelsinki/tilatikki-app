const School = require('../models/School');

const Building = require('../models/Building');
const Floor = require('../models/Floor');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');

exports.createSchoolWithNestedEntities = async (req, res) => {
  const session = await School.startSession();
  session.startTransaction();
  try {
    const { name, address, buildings } = req.body;

    const newSchool = new School({ name, address });
    const school = await newSchool.save({ session });

    if (buildings) {
      for (const buildingData of buildings) {
        const newBuilding = new Building({ name: buildingData.name, school: school._id });
        const building = await newBuilding.save({ session });

        if (buildingData.floors) {
          for (const floorData of buildingData.floors) {
            const newFloor = new Floor({ number: floorData.number, building: building._id });
            const floor = await newFloor.save({ session });

            if (floorData.rooms) {
              for (const roomData of floorData.rooms) {
                const newRoom = new Room({ number: roomData.number, capacity: roomData.capacity, floor: floor._id });
                const room = await newRoom.save({ session });

                if (roomData.reservations) {
                  for (const reservationData of roomData.reservations) {
                    const newReservation = new Reservation({
                      user: reservationData.user,
                      startTime: reservationData.startTime,
                      endTime: reservationData.endTime,
                      purpose: reservationData.purpose,
                      room: room._id
                    });
                    await newReservation.save({ session });
                  }
                }
              }
            }
          }
        }
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.status(201).json(school);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const newSchool = new School({ name, address });
    const school = await newSchool.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate({
      path: 'buildings',
      populate: {
        path: 'floors',
        populate: {
          path: 'rooms',
          populate: {
            path: 'reservations'
          }
        }
      }
    });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().populate(
      {
        path: 'buildings',
        populate: {
          path: 'floors',
          populate: {
            path: 'rooms',
            populate: {
              path: 'reservations'
            }
          }
        }
      }
    )
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
