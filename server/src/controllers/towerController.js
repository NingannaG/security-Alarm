const express = require("express");
const router = express.Router();
const { detectAnomalyAndPostData } = require("../utils/anomalyChecker");
const { fetchChartsData, fetchAnomalyTowerData } = require("../utils/helper");

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

router.get("/:id", async (req, res) => {
  try {
    const towerId = req.params.id; // Get the tower ID from the URL parameters
    const chartsData = await fetchChartsData(towerId);
    const anomalyData = await fetchAnomalyTowerData(towerId);

    res.json({ chartsData, anomalyData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
