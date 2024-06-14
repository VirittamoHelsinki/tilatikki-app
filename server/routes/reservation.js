const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.get('/reservations/:id', reservationController.getReservationById);
router.get('/reservations', reservationController.getReservations);
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;

