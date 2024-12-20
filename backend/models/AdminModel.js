const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {  // Kolom baru 'name' ditambahkan
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
