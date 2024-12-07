const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Berikan nama unik untuk gambar
  },
});

const upload = multer({ storage: storage });

// GET all services
router.get('/', serviceController.getAllServices);

// GET service by category
router.get('/:category', serviceController.getServiceByCategory);

// POST create new service (with file upload handling)
router.post('/', upload.single('image'), serviceController.createService); // Tambahkan middleware upload

// PUT update service by category and ID (with file upload handling)
router.put('/:category/:id', upload.single('image'), serviceController.updateServiceByCategoryAndId);

// GET service by category and id
router.get('/:category/:id', serviceController.getServiceByCategoryAndId);

module.exports = router;
