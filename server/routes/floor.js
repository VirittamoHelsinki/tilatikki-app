const express = require('express');
const router = express.Router();
const floorController = require('../controllers/floorController');

router.post('/floors', floorController.createFloor);
router.get('/floors/:id', floorController.getFloorById);

module.exports = router;

