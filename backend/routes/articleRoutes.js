const express = require('express');
const { createArticle, getAllArticles, getArticleById } = require('../controllers/articleController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Gunakan multer pada rute yang memerlukan upload file
router.post('/articles', upload.single('image'), createArticle);

// Rute untuk mendapatkan semua artikel
router.get('/articles', getAllArticles);

// Rute untuk mendapatkan artikel berdasarkan ID
router.get('/articles/:id', getArticleById);

module.exports = router;
