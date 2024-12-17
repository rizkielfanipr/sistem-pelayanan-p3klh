const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Register Route
router.post('/register', userController.register);

// Login Route
router.post('/login', userController.login);

// Refresh Token Route
router.post('/refresh_token', userController.refreshToken);

module.exports = router;
