const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.get('/reservations/:id', reservationController.getReservationById);

module.exports = router;

