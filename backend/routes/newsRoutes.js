const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Mendapatkan semua berita
router.get('/', newsController.getAllNews);

// Membuat berita baru dengan upload image
router.post('/create', newsController.createNews);

// Mengupdate berita dengan upload image
router.put('/update/:id', newsController.updateNews);

// Menghapus berita
router.delete('/delete/:id', newsController.deleteNews);

module.exports = router;
