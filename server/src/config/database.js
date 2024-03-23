// src/config/database.js
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

module.exports = connectDB;
