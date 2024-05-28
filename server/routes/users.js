const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/userdata/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userData = await User.findOne({ email: userEmail });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/register', async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      surname,
      email,
      password
    });

    await user.save();
    res.send('User registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    // Extract data from request body
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user and password are valid, send success response
    res.status(200).json({ message: 'Login successful', user });     
  } catch (error) {
    // Handle error if any
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
