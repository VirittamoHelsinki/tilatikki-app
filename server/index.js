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
app.use(schoolRoutes);
app.use(buildingRoutes);
app.use(floorRoutes);
app.use(roomRoutes);
app.use(reservationRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
