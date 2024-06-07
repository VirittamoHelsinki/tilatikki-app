const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	floors: [{
		type: mongoose.Types.ObjectId,
		ref: 'Floor',
		required: true
	}]
});

module.exports = mongoose.model('Building', BuildingSchema);
