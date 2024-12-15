const Discussion = require('../models/DiscussionModel'); // Update import model
const Reply = require('../models/ReplyModel');
const multer = require('multer');
const path = require('path');

// Setup multer untuk upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder "uploads" sudah ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik berdasarkan timestamp
  },
});

const upload = multer({ storage: storage });

// Mendapatkan semua diskusi
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.findAll();
    res.status(200).json({
      message: "All discussions fetched successfully",
      data: discussions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat diskusi baru dengan image upload
exports.createDiscussion = [
  upload.single('image'), // Hanya satu file image yang diupload
  async (req, res) => {
    const { topic, title, content } = req.body;
    const image = req.file?.path || null; // Ambil path gambar yang diupload

    if (!topic || !title || !content) {
      return res.status(400).json({ message: 'Topic, title, and content are required' });
    }

    try {
      const newDiscussion = await Discussion.create({
        topic,
        title,
        content,
        image,
      });

      res.status(201).json({
        message: 'Discussion created successfully',
        data: newDiscussion,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Mendapatkan diskusi berdasarkan ID
exports.getDiscussionById = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    const discussion = await Discussion.findByPk(id); // Mencari diskusi berdasarkan ID

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.status(200).json({
      message: 'Discussion fetched successfully',
      data: discussion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan balasan untuk diskusi
exports.getRepliesForDiscussion = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID diskusi
  
    try {
      const replies = await Reply.findAll({
        where: { discussionId: id },
        order: [['createdAt', 'ASC']], // Mengurutkan balasan berdasarkan waktu dibuat
      });
  
      res.status(200).json({
        message: 'Replies fetched successfully',
        data: replies,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Membuat balasan untuk diskusi
  exports.createReply = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID diskusi dari parameter
    const { content } = req.body; // Mendapatkan konten balasan
  
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Balasan tidak boleh kosong' });
    }
  
    try {
      const newReply = await Reply.create({
        content,
        discussionId: id, // Mengaitkan balasan dengan diskusi yang sesuai
      });
  
      res.status(201).json({
        message: 'Balasan berhasil dibuat',
        data: newReply,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };