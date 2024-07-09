const express = require('express');
const router = express.Router();
const mailer = require('../config/mailer');
const verifyToken = require('../middleware/authMiddleware');

router.post('/send-confirmation-email', verifyToken, (req, res) => {
  const { email, token } = req.body;
  mailer.sendConfirmationEmail(email, token);
  res.status(200).json({ message: 'Confirmation email sent successfully!' });
});

router.post('/send-reset-password-email', (req, res) => {
  const { email, token } = req.body;
  mailer.sendResetPasswordEmail(email, token);
  res.status(200).json({ message: 'Reset password email sent successfully!' });
});

router.post('/send-email-result', verifyToken, mailer.sendEmailResult);

module.exports = router;
