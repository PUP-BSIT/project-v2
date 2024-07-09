const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/questions', verifyToken, quizController.getQuestionsWithOptions);
router.post('/results', verifyToken, quizController.saveResult);
router.get('/results', verifyToken, quizController.getTestResult);
router.get('/results/:resultId', verifyToken, quizController.getResultById);
router.get('/recommendations/:season_id/:subcategory_id', quizController.getRecommendations);
router.get('/history', verifyToken, quizController.getTestHistory);

module.exports = router;