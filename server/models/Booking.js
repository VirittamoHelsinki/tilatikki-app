const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	school: {
		type: Schema.Types.ObjectId,
		ref: 'School',
		required: true
	},
	building: {
		type: Schema.Types.ObjectId,
		ref: 'Building',
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
		required: true
	},
	groupsize: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Booking', BookingSchema);
