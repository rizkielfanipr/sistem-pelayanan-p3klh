const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Announcement = sequelize.define('Announcement', {
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
  file: {
    type: DataTypes.STRING,
    allowNull: true, // File bisa null
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Tanggal upload otomatis
  },
});

module.exports = Announcement;
