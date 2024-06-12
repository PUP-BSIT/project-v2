const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController); 
router.post('/signup', authController.signup);
router.get('/confirm/:token', authController.confirmEmail);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
