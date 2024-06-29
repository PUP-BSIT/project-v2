const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/profile', verifyToken, authController.getUserProfile);

module.exports = router;
