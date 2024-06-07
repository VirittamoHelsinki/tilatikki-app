const School = require('../models/School');
const Building = require('../models/Building');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Room = require('../models/Room');
const Floor = require('../models/Floor');

exports.createSchool = async (req, res) => {
	const session = await School.startSession();
	session.startTransaction();
	try {
		const { name, intro, buildings, users } = req.body;

		const newSchool = new School({ name, intro, buildings, users});
		const school = await newSchool.save({ session });
		res.status(201).json(school);
	}
	catch (error) {
		await session.commitTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};

exports.createSchoolWithEntities = async (req, res) => {
	const session = await School.startSession();
	session.startTransaction();
	try {
		const { name, intro, buildings, users } = req.body;

		const newSchool = new School({ name, intro });
		const school = await newSchool.save({ session });

		if (buildings) {
			for (const buildingData of buildings) {
				const newBuilding = new Building({ name: buildingData.name });
				const building = await newBuilding.save({ session });

				const floorIds = [];
				if (buildingData.floors) {
					for (const floorData of buildingData.floors) {
						const newFloor = new Floor({ name: floorData.name });
						const floor = await newFloor.save({ session });

						const roomIds = [];
						if (floorData.rooms) {
							for (const roomData of floorData.rooms) {
								const newRoom = new Room({ name: roomData.name, capacity: roomData.capacity });
								const room = await newRoom.save({ session });

								const bookingIds = [];
								if (roomData.bookings) {
									for (bookingData of roomData.bookings) {
										const newBooking = new Booking({
											name: bookingData.name,
											startTime: bookingData.startTime,
											endTime: bookingData.endTime,
											user: bookingData.user,
											school: school._id,
											building: building._id,
											room: room._id,
											groupSize: bookingData.groupSize
										});
										const booking = await newBooking.save({ session });
										bookingIds.push(booking._id);
									}
									newRoom.bookings = bookingsIds;
									await newRoom.save({ session });
								}
								roomIds.push(room._id);
							}
							newFloor.rooms = roomIds;
							await newFloor.save({ session });
						}
						floorIds.push(floor._id);
					}
					newBuilding.floors = floorIds;
					await newBuilding.save({ session });
				}
				school.buildings.push(building._id);
				await school.save({ session });
			}
		}
		await session.commitTransaction();
		session.endSession();
		res.status(201).json(school);
	}
	catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};

exports.addUserToSchool = async (req, res) => {
	const session = await School.startSession();
	session.startTransaction();
	try {
		const { schoolId, userId } = req.body;

		const user = User.findById(userId);
		if (!user) {
			throw new Error(`Käyttäjää ei löytynyt, ID: ${userId}`);
		}

		const school = School.findById(schoolId);
		if (!school) {
			throw new Error(`Koulua ei löytynyt, ID: ${schoolId}`)
		}

		if (school.users.includes(userID)) {
			throw new Error(`Käyttäjä '${userId}' on jo lisätty kouluun '${schoolId}'`);
		}

		school.users.push(userId);
		await school.save({ session });
		await session.commitTransaction();
		session.endSession();
		res.status(200).json({ message: 'Käyttäjän lisääminen onnistui.'});
	}
	catch (error) {
		await session.abortTransaction();
		session.endSession();
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
						path: 'bookings'
					}
				}
			}
		});
		if (!school) {
			return res.status(404).json({ error: error.message });
		}
		res.status(200).json(school);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllSchoolsFullRef = async (req, res) => {
	try {
		const schools = await School.find().populate({
			path: 'buildings',
			populate: {
				path: 'floors',
				populate: {
					path: 'rooms',
					populate: {
						path: 'bookings'
					}
				}
			}
		});
		res.status(200).json(schools);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllSchools = async (req, res) => {
	try {
		const schools = await School.find();
		res.status(200).json(schools);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};
