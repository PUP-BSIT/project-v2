const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router.get('/clinics', clinicController.getAllClinics);

module.exports = router;