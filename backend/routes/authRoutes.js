const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Refresh Token Route
router.post('/refresh_token', authController.refreshToken);

module.exports = router;
