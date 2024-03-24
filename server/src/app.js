const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");
const http = require("http");
const cron = require("node-cron");
const { PORT } = require("./constants/constant");
const { Server } = require("socket.io");
const { REFRESH_TIME, CLIENT_URL } = require("./constants/constant");
const { getRealTimeData } = require("./utils/helper");
const { getRandomTower } = require("./IOTService/generate");

const app = express();
const httpServer = http.createServer(app);
app.use(cors());
let dataTransferJob;

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
      dataTransferJob = cron.schedule(
        `*/${REFRESH_TIME} * * * * *`,
        async () => {
          const newData = await getRealTimeData();
          socket.emit("iot-data-updated", newData);
        }
      );
      dataTransferJob.start();

      socket.on("disconnect", () => {
        if (dataTransferJob) {
          dataTransferJob.stop();
          dataTransferJob = null;
        }
      });
    } catch (error) {
      console.error("Error updating real-time data:", error);
    }
  });
});

const dataGenerateJob = cron.schedule(`*/${REFRESH_TIME} * * * * *`, () => {
  getRandomTower();
});

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
dataGenerateJob.start();
startServer();
