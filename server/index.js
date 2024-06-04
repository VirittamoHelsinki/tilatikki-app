const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const users = require('./routes/users');
const schoolRoutes = require('./routes/school')
const buildingRoutes = require('./routes/building')
const floorRoutes = require(
  './routes/floor'
)
const roomRoutes = require('./routes/room')
const reservationRoutes = require('./routes/reservation')
require('dotenv').config();


const app = express();

connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies


app.use(users);
app.use('/api', schoolRoutes);
app.use('/api', buildingRoutes);
app.use('/api', floorRoutes);
app.use('/api', roomRoutes);
app.use('/api', reservationRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
