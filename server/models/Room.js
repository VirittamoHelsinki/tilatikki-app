const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	capacity: {
		type: Number,
		required: true
	},
	building: {
		type: Schema.Types.ObjectId,
		ref: 'Building',
		required: true
	},
	bookings: [{
		type: Schema.Types.ObjectId,
		ref: 'Booking'
	}]
});

module.exports = mongoose.model('Room', RoomSchema);
