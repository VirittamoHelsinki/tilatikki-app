const mongoose = require('mongoose');

const FloorSchema = new mongoose.Schema({
	name: {
		type: Number,
		required: true
	},
	rooms: [{
		type: mongoose.Types.ObjectId,
		ref: 'Room'
	}]
})

module.exports = mongoose.model('Floor', FloorSchema);
