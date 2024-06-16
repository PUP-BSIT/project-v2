const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/questions', quizController.getQuestions);

module.exports = router;