const Announcement = require('../models/AnnouncementModel');
const multer = require('multer');
const path = require('path');

// Setup multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder "uploads" sudah ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik berdasarkan timestamp
  },
});

const upload = multer({ storage: storage });

// Mendapatkan semua pengumuman
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat pengumuman baru dengan file upload
exports.createAnnouncement = [
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  async (req, res) => {
    const { title, content } = req.body;
    const image = req.files?.image?.[0]?.path || null;
    const file = req.files?.file?.[0]?.path || null;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
      const newAnnouncement = await Announcement.create({
        title,
        content,
        image,
        file,
      });
      res.status(201).json({
        message: 'Announcement created successfully',
        data: newAnnouncement,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Mengunduh file dari pengumuman
exports.downloadFile = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByPk(id);
    if (!announcement || !announcement.file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.download(announcement.file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
