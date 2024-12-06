const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Service = sequelize.define('Service', {
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
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM(
      'penapisan-dokling',
      'penilaian-amdal',
      'pemeriksaan-uklupl',
      'penilaian-delhdplh',
      'amdalnet'
    ),
    allowNull: false,
  },
});

module.exports = Service;
