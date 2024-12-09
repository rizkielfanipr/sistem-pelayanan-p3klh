const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Mendapatkan semua Announcement
router.get('/', announcementController.getAllAnnouncements);

// Membuat Announcement baru dengan file upload
router.post('/create', announcementController.createAnnouncement);

// Rute untuk mengunduh file dari Announcement
router.get('/download/:id', announcementController.downloadFile);

module.exports = router;
