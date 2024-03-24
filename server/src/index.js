// app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { getRandomTower } = require("./IOTService/generate");
const Tower = require("./models/tower");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//Todo --> CRON Job
setInterval(getRandomTower, 2000); // Run getRandomTower function every 5 seconds (5000 milliseconds)

// Define a sample route to send data
app.get("/api/data", async (req, res) => {
  const towerData = await Tower.aggregate([
    {
      $sort: { time: -1 }, // Sort by time in descending order
    },
    {
      $group: {
        _id: "$tower",
        maxTime: { $first: "$time" }, // Get the maximum time for each tower
        data: { $first: "$$ROOT" }, // Get the entire document with the maximum time
      },
    },
    {
      $replaceRoot: { newRoot: "$data" }, // Replace the root with the document having maximum time
    },
  ]);
  towerData.sort((a, b) => a.tower - b.tower);
  res.send(towerData);
});

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
