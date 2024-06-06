const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	intro: {
		type: String
	},
	buildings: [{
		type: mongoose.Types.ObjectId,
		ref: 'Building',
		required: true
	}],
	users: [{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('School', SchoolSchema);
