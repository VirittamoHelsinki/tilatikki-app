const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/rooms', roomController.createRoom);
router.get('/rooms/:id', roomController.getRoomById);
router.get('/rooms/:roomId/total-people', roomController.getTotalPeopleReserved);

module.exports = router;

