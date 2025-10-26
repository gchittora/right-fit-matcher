const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

// GET /api/universities - Get all universities
router.get('/', universityController.getAllUniversities);

// GET /api/universities/:id - Get single university
router.get('/:id', universityController.getUniversityById);

module.exports = router;
