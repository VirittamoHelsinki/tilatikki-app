const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const users = require('./routes/users');
require('dotenv').config();


const app = express();

connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies


app.use(users);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
