const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendee = sequelize.define('Attendee', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Attendee;