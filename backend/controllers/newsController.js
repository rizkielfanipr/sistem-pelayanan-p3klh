const NewsModel = require('../models/newsModel'); // Update import model
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

// Mendapatkan semua berita
exports.getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat berita baru dengan image upload
exports.createNews = [
  upload.single('image'), // Hanya satu file image yang diupload
  async (req, res) => {
    const { title, content } = req.body;
    const image = req.file?.path || null; // Ambil path gambar yang diupload

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
      const newNews = await NewsModel.create({
        title,
        content,
        image,
      });
      res.status(201).json({
        message: 'News created successfully',
        data: newNews,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Mengupdate berita dengan image upload
exports.updateNews = [
  upload.single('image'), // Hanya satu file image yang diupload
  async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file?.path || null;

    try {
      const news = await NewsModel.findByPk(id);

      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }

      news.title = title || news.title;
      news.content = content || news.content;
      news.image = image || news.image;

      await news.save();

      res.status(200).json({
        message: 'News updated successfully',
        data: news,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Menghapus berita
exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await NewsModel.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    await news.destroy();

    res.status(200).json({
      message: 'News deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
