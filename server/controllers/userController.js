const User = require('../models/User');

exports.createUser = async (req, res) => {
	try {
		const { name, surname, email, password, admin } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Käyttäjä on jo olemassa.'});
		}

		const newUser = new User({ name, surname, email, password, admin });

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
}
