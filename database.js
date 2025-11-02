const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Load environment variables (optional if app.js already loads it)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Debug environment variables
console.log('Database Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

let sslOptions;
try {
  sslOptions = {
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, './ca.pem')) // Relative path to ca.pem
    }
  };
} catch (err) {
  console.error('Failed to load ca.pem:', err);
  sslOptions = {}; // Fallback to no SSL (for debugging)
}

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  dialectOptions: sslOptions,
  logging: console.log // Log SQL queries and connection attempts
});

module.exports = sequelize;