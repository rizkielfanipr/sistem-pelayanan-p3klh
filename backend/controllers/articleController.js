const Article = require('../models/ArticleModel');

// Fungsi untuk membuat artikel baru
const createArticle = async (req, res) => {
    const { title, content } = req.body;
    const imageUrl = req.file ? req.file.path : null;
  
    try {
      const newArticle = await Article.create({
        title,
        content,
        imageUrl,
      });
  
      res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Fungsi untuk mendapatkan semua artikel
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fungsi untuk mendapatkan artikel berdasarkan ID
const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createArticle, getAllArticles, getArticleById };
