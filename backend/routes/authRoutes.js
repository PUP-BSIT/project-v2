const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController); 
router.post('/signup', authController.signup);
router.get('/confirm/:token', authController.confirmEmail);
router.post('/login', authController.login);

module.exports = router;
