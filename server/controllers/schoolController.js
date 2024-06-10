const School = require('../models/School');
const Building = require('../models/Building');
const Floor = require('../models/Floor');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

exports.createSchoolWithNestedEntities = async (req, res) => {
  console.log('body: ', req.body);
  const session = await School.startSession();
  session.startTransaction();
  try {
    const { name, address, buildings, users } = req.body;

    // Create Users
    const userIds = [];
    for (const userData of users) {
      const newUser = new User(userData);
      const user = await newUser.save({ session });
      userIds.push(user._id);
    }

    // Create School
    const newSchool = new School({ name, address });
    const school = await newSchool.save({ session });

    const buildingIds = [];
    for (const buildingData of buildings) {
      const newBuilding = new Building({ name: buildingData.name, school: school._id });
      const building = await newBuilding.save({ session });
      buildingIds.push(building._id);

      const floorIds = [];
      for (const floorData of buildingData.floors) {
        const newFloor = new Floor({ number: floorData.number, building: building._id });
        const floor = await newFloor.save({ session });
        floorIds.push(floor._id);

        const roomIds = [];
        for (const roomData of floorData.rooms) {
          const newRoom = new Room({ number: roomData.number, capacity: roomData.capacity, floor: floor._id });
          const room = await newRoom.save({ session });
          roomIds.push(room._id);

          const reservationIds = [];
          for (const reservationData of roomData.reservations) {
            const userId = userIds.find(userId => userId.equals(reservationData.user));  // Replace user email with corresponding user ID
            const newReservation = new Reservation({
              user: userId,
              startTime: reservationData.startTime,
              endTime: reservationData.endTime,
              purpose: reservationData.purpose,
              groupsize: reservationData.groupsize,
              room: room._id
            });
            const reservation = await newReservation.save({ session });
            reservationIds.push(reservation._id);
          }
          // Push reservations to room
          await Room.findByIdAndUpdate(room._id, { reservations: reservationIds }, { session });
        }
        // Push rooms to floor
        await Floor.findByIdAndUpdate(floor._id, { rooms: roomIds }, { session });
      }
      // Push floors to building
      await Building.findByIdAndUpdate(building._id, { floors: floorIds }, { session });
    }
    // Push buildings to school
    await School.findByIdAndUpdate(school._id, { buildings: buildingIds, users: userIds }, { session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json(school);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

// exports.createSchoolWithNestedEntities = async (req, res) => {
//   console.log('body: ', req.body);
//   const session = await School.startSession();
//   session.startTransaction();
//   try {
//     const { name, address, buildings } = req.body;
//
//     const newSchool = new School({ name, address });
//     const school = await newSchool.save({ session });
//
//     const buildingIds = [];
//     for (const buildingData of buildings) {
//       const newBuilding = new Building({ name: buildingData.name, school: school._id });
//       const building = await newBuilding.save({ session });
//       buildingIds.push(building._id);
//
//       const floorIds = [];
//       for (const floorData of buildingData.floors) {
//         const newFloor = new Floor({ number: floorData.number, building: building._id });
//         const floor = await newFloor.save({ session });
//         floorIds.push(floor._id);
//
//         const roomIds = [];
//         for (const roomData of floorData.rooms) {
//           const newRoom = new Room({ number: roomData.number, capacity: roomData.capacity, floor: floor._id });
//           const room = await newRoom.save({ session });
//           roomIds.push(room._id);
//
//           const reservationIds = [];
//           for (const reservationData of roomData.reservations) {
//             const newReservation = new Reservation({
//               user: reservationData.user,
//               startTime: reservationData.startTime,
//               endTime: reservationData.endTime,
//               purpose: reservationData.purpose,
//               room: room._id
//             });
//             const reservation = await newReservation.save({ session });
//             reservationIds.push(reservation._id);
//           }
//           // Push reservations to room
//           await Room.findByIdAndUpdate(room._id, { reservations: reservationIds }, { session });
//         }
//         // Push rooms to floor
//         await Floor.findByIdAndUpdate(floor._id, { rooms: roomIds }, { session });
//       }
//       // Push floors to building
//       await Building.findByIdAndUpdate(building._id, { floors: floorIds }, { session });
//     }
//     // Push buildings to school
//     await School.findByIdAndUpdate(school._id, { buildings: buildingIds }, { session });
//
//     await session.commitTransaction();
//     session.endSession();
//     res.status(201).json(school);
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).json({ error: error.message });
//   }
// };

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
  console.log('testing connection')
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
