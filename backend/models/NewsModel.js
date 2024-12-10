const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const NewsModel = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Gambar bisa null
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Tanggal otomatis
  },
});

module.exports = NewsModel;
