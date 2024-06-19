const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/questions', verifyToken, quizController.getQuestionsWithOptions);
router.post('/results', verifyToken, quizController.saveResult);
router.get('/results', verifyToken, quizController.getTestResult);

module.exports = router;
