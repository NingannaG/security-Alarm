// app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { getRandomTower } = require("./IOTService/generate");
const http = require("http");
const Tower = require("./models/tower");
const { Server } = require("socket.io");
const { REFRESH_TIME, PORT, CLIENT_URL } = require("./constants/constant");

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET"],
  },
});

// listenning to event, on a separate socket
io.on("connection", (socket) => {
  try {
    // Socket id is shared between the client and server
    console.info("CONNECTION-MADE: ", socket.id);

    // Listen for "join_towerdata" event from a client
    socket.on("join_towerdata", async () => {
      console.log(`Client ${socket.id} joined towerdata channel`);
      const data = await getRealTimeData();
      socket.emit("iot-data-updated", data);
      setInterval(async () => {
        const data = await getRealTimeData();
        socket.emit("iot-data-updated", data);
      }, REFRESH_TIME);
    });
  } catch (e) {
    console.info("ERROR WHILE MAKING CONNECTION: ");
    console.error(e);
  }
});

//Todo --> CRON Job
setInterval(getRandomTower, REFRESH_TIME); // Run getRandomTower function every 5 seconds (5000 milliseconds)

// Define a sample route to send data

async function getRealTimeData() {
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
  return towerData;
}

async function startServer() {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
