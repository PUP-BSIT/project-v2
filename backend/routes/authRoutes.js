const express = require('express');
const { signup, confirmEmail, login } = require('../controllers/authcontrollers');

const router = express.Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);

module.exports = router;
