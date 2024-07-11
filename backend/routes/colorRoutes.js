const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

router.get('/data-with-subcategory/:subcategory_id', colorController.getDataWithSubcategory);

module.exports = router;
