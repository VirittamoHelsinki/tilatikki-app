const express = require('express');
const router = express.Router();
const User = require('../models/User');

//get all users
router.get('/userdata', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get one user by email
router.get('/userdata/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    // Find the user by email and populate the reservations
    const userData = await User.findOne({ email: userEmail }).populate({
      path: 'reservations',
      populate: {
        path: 'room', // If you need to populate room data within reservations
        populate: {
          path: 'reservations', // Populating reservations of the room if necessary
          populate: {
            path: 'user', // If you need to populate user data within reservations of the room
          }
        }
      }
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get one user by id
router.get('/userdata/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Convert ObjectId to string
      const userData = user.toObject();
      userData._id = userData._id.toString();
      console.log("userData", userData)

      res.status(200).json(userData);
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: error.message });
  }
});


router.post('/register', async (req, res) => {
  const { name, surname, email, password, subteacher} = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      surname,
      email,
      password,
      subteacher: "Alma Ahkera"
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

router.delete('/deleteuser/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
    // Find the user by email
    const result = await User.deleteOne({ email: userEmail });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Perform any additional cleanup or cascading deletions if necessary
    // For example, you might delete related reservations or other associated data
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/update/:email', async (req, res) => {
  const { name, surname, email, subteacher, admin } = req.body;
  const currentEmail = req.params.email;

  try {
    let user = await User.findOne({ email: currentEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (subteacher !== undefined) user.subteacher = subteacher;
    if (admin !== undefined) user.admin = admin;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/updatePassword/:email', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const currentEmail = req.params.email;

  try {
    let user = await User.findOne({ email: currentEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Only update password if user has provided the current password
    // and a new one.
    if (!(newPassword && await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }
    
    user.password = newPassword;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
