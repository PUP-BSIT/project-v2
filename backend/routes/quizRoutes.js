const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/questions', quizController.getQuestionsWithOptions);
router.post('/results', quizController.saveResult);

module.exports = router;