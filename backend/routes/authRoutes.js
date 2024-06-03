const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController); 
router.post('/signup', authController.signup);
router.get('/confirm/:token', authController.confirmEmail);

module.exports = router;
