const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

router.post('/reservations/', BookingController.createBooking);
router.delete('/reservations/:bookingId', BookingController.deleteBooking);

module.exports = router;
