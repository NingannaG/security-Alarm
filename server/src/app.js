const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { PORT } = require("./constants/constant");
const { Server } = require("socket.io");
const { REFRESH_TIME, CLIENT_URL } = require("./constants/constant");
const { getRealTimeData } = require("./utils/helper");
const { getRandomTower } = require("./IOTService/generate");

const app = express();
const httpServer = http.createServer(app);
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET"],
  },
});

// Handle socket.io connection
io.on("connection", (socket) => {
  console.info("CONNECTION-MADE: ", socket.id);

  // Listen for 'join_towerdata' event
  socket.on("join_towerdata", async () => {
    try {
      const data = await getRealTimeData();
      socket.emit("iot-data-updated", data);

      // Update data at regular intervals
      const updateInterval = setInterval(async () => {
        const newData = await getRealTimeData();
        socket.emit("iot-data-updated", newData);
      }, REFRESH_TIME);

      // Clean up interval on socket disconnect
      socket.on("disconnect", () => {
        clearInterval(updateInterval);
      });
    } catch (error) {
      console.error("Error updating real-time data:", error);
    }
  });
});

setInterval(getRandomTower, REFRESH_TIME); // Run getRandomTower function every 5 seconds (5000 milliseconds)


const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();