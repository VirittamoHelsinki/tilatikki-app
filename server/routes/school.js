const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/school', schoolController.createSchoolWithNestedEntities);
/* router.post('/schools', schoolController.createSchool); */
router.get('/schools/:id', schoolController.getSchoolById);
router.get('/schools', schoolController.getAllSchools);

module.exports = router;

