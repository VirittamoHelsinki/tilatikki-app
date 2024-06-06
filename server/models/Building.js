const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	school: {
		type: mongoose.Types.ObjectId,
		ref: 'School',
		required: true
	},
	floors: {
		type: Number,
		required: true
	},
	rooms: [{
		type: mongoose.Types.ObjectId,
		ref: 'Room'
	}]
});

module.exports = mongoose.model('Building', BuildingSchema);
