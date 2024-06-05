const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	school: {
		type: Schema.Types.ObjectId,
		ref: 'School',
		required: true
	},
	floors: {
		type: Number,
		required: true
	},
	rooms: [{
		type: Schema.Types.ObjectId,
		ref: 'Room'
	}]
});

module.exports = mongoose.model('Building', BuildingSchema);
