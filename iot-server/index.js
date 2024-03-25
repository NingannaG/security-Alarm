const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/constant");
const { startCronJobService } = require("./src/cronJobService");
const app = express();
app.use(cors());

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startCronJobService.start();
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
