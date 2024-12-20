const express = require('express');
const router = express.Router();
const { createConsultation } = require('../controllers/consultationController');
const upload = require('../middlewares/uploadMiddleware');

// POST route to handle consultation form submission
router.post('/', upload.single('file'), createConsultation);

module.exports = router;
