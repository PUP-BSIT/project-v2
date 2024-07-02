const express = require('express');
const router = express.Router();
const mailer = require('../config/mailer');
const verifyToken = require('../middleware/authMiddleware');

router.post('/send-email', verifyToken, mailer.sendEmailResult);

module.exports = router;
