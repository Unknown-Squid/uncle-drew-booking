require('dotenv').config({ path: '.env.local' });

const express = require("express");
const sequelize = require("./configs/config");
const cors = require("cors");
const app = express();

// Import routes
const bookingRoutes = require("./src/Routes/bookingRoutes");
const adminAccountRoutes = require("./src/Routes/adminAccountRoutes");

// Middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  next();
});

// Routes
app.use("/", bookingRoutes);
app.use("/", adminAccountRoutes);

// Test DB connection and sync models
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and models synced");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});