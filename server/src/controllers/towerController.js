const express = require("express");
const router = express.Router();
const { detectAnomalyAndPostData } = require("../utils/anomalyChecker");

router.post("/", async (req, res) => {
  try {
    const towerData = req.body;
    res.send("Data sent successfully");
    detectAnomalyAndPostData(towerData);
  } catch (error) {
    console.error("Error pushing data to MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
