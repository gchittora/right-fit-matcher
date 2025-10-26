const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// POST /api/match - Match universities based on user profile
router.post('/', matchController.matchUniversities);

module.exports = router;
