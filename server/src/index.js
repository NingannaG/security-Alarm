// app.js
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const PORT = process.env.PORT || 3000;

const { getRandomTower } = require("./IOTService/generate");

//Todo --> CRON Job
setInterval(getRandomTower, 2000); // Run getRandomTower function every 5 seconds (5000 milliseconds)

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
