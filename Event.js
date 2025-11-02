const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  date: { type: DataTypes.DATE, allowNull: false },
  inviteKey: { type: DataTypes.STRING(8), unique: true, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Event;