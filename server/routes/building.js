const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');

router.post('/buildings', buildingController.createBuilding);
router.get('/buildings/:id', buildingController.getBuildingById);

module.exports = router;

