const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Discussion = sequelize.define('Discussion', {
  topic: {
    type: DataTypes.ENUM,
    values: ['Penapisan Dokling', 'Penilaian AMDAL', 'Pemeriksaan UKL UPL', 'Registrasi SPPL', 'Penilaian DELH & DPLH', 'AMDALNET'],
    allowNull: false,
  },
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Discussion;
