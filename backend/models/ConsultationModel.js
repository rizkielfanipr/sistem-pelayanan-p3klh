// models/Consultation.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/Database'); // Pastikan ini mengarah ke file config yang benar

const Consultation = sequelize.define('Consultation', {
  service: {
    type: DataTypes.ENUM(
      'penapisan-dokling', 
      'penilaian-amdal', 
      'pemeriksaan-uklupl', 
      'registrasi-sppl', 
      'penilaian-delhdplh', 
      'amdalnet', 
      'lain-lain'
    ),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  session: {
    type: DataTypes.ENUM('sesi1', 'sesi2', 'sesi3'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  code: {
    type: DataTypes.STRING(7),
    allowNull: false
  }
});

module.exports = Consultation;
