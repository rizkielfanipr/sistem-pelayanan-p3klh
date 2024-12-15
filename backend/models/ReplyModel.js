const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const Discussion = require('./DiscussionModel'); // Pastikan untuk import model Discussion

const Reply = sequelize.define('Reply', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  discussionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Discussion,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Reply;
