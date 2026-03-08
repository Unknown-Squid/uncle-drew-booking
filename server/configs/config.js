require('dotenv').config({ path: '.env.local' });

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with your database details
const sequelize = new Sequelize(
  process.env.DB_NAME || "uncle_drew_booking",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Pokemon_1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql", // Change to 'mysql' or other dialects based on your database
  }
);

module.exports = sequelize;
