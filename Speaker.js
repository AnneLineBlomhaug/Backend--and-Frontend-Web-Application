const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Speaker = sequelize.define('Speaker', {
  name: { type: DataTypes.STRING, allowNull: false },
  bio: DataTypes.TEXT,
});

module.exports = Speaker;