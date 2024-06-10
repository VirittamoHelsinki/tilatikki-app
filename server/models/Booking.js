const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	school: {
		type: mongoose.Types.ObjectId,
		ref: 'School',
		required: true
	},
	building: {
		type: mongoose.Types.ObjectId,
		ref: 'Building',
		required: true
	},
	room: {
		type: mongoose.Types.ObjectId,
		ref: 'Room',
		required: true
	},
	groupSize: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Booking', BookingSchema);
