// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Tentukan lokasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tentukan folder penyimpanan file
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Tentukan nama file yang akan disimpan
    const extname = path.extname(file.originalname);
    const filename = Date.now() + extname;
    cb(null, filename);
  }
});

// Filter untuk memastikan hanya file yang diizinkan
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|pdf|docx/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

// Membuat instance multer dengan konfigurasi di atas
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
  fileFilter
});

module.exports = upload;
