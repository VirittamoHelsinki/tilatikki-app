const Booking = require('../models/Booking');
const User = require('../models/User');
const Room = require('../models/Room');
const School = require('../models/School');
const Building = require('../models/Building');

exports.createBooking = async (req, res) => {
	const session = await Booking.startSession();
	session.startTransaction();
	try {
		const { name, startTime, endTime, userId, schoolId, buildingId, roomId, groupSize } = req.body;

		const existingRoom = Room.findById(roomId);
		if (!existingRoom) {
			await session.abortTransaction();
			session.endSession();
			throw new Error(`Huonetta '${roomId}' ei löydy`);
		}
		const existingUser = User.findById(userId);
		if (!existingUser) {
			await session.abortTransaction();
			session.endSession();
			throw new Error(`Käyttäjää '${userId}' ei löydy`);
		}
		const existingBuilding = Building.findById(buildingId);
		if (!existingBuilding) {
			await session.abortTransaction();
			session.endSession();
			throw new Error(`Rakennusta '${buildingId}' ei löydy`);
		}
		const existingSchool = School.findById(schoolId);
		if (!existingSchool) {
			await session.abortTransaction();
			session.endSession();
			throw new Error(`Koulua '${schoolId}' ei löydy`);
		}

		const newBooking = new Booking ({
			name,
			startTime,
			endTime,
			user: userId,
			school: schoolId,
			building: buildingId,
			room: roomId,
			groupSize
		});
		const savedBooking = await newBooking.save({ session });
		await User.findByIdAndUpdate(userId, { $push: {bookings: savedBooking._id }}, { session });
		await Room.findByIdAndUpdate(roomId, { $push: {bookings: savedBooking._id }}, { session });

		await session.commitTransaction();
		session.endSession();
		res.status(201).json(savedBooking);
	}
	catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};

exports.deleteBooking = async (req, res) => {
	const session = await Booking.startSession();
	session.startTransaction();
	try {
		const { bookingId } = req.body;

		const booking = await Booking.findById(bookingId).session(session);
		if (!booking) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({ message: 'Varausta ei löydy'});
		}

		await User.findByIdAndUpdate(booking.user, { $pull: {bookings: booking._id }}, { session });
		await Room.findByIdAndUpdate(booking.room, { $pull: {bookings: booking._id }}, { session });

		await booking.remove({ session });
		await session.commitTransaction();
		session.endSession();
		res.status(200).json({ message: 'Varauksen poisto onnistui'});
	}
	catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};
