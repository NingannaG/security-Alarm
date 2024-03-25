const Tower = require("../models/tower");

exports.getRealTimeData = async () => {
  try {
    // Fetch real-time data using aggregation pipeline
    const towerData = await Tower.aggregate([
      { $sort: { time: -1 } }, // Sort by time in descending order
      {
        $group: {
          _id: "$tower",
          maxTime: { $first: "$time" }, // Get the maximum time for each tower
          data: { $first: "$$ROOT" }, // Get the entire document with the maximum time
        },
      },
      { $replaceRoot: { newRoot: "$data" } }, // Replace the root with the document having maximum time
    ]);

    // Sort the data by tower Number
    towerData.sort((a, b) => a.tower - b.tower);

    return towerData;
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    throw new Error("Failed to fetch real-time data");
  }
};

exports.fetchChartsData = async (towerNumber) => {
  try {
    const towerData = await Tower.find({ tower: towerNumber })
      .sort({ time: -1 }) // Sort by time in descending order
      .limit(20)
      .select("tower city fuelStatus temperature time -_id"); 
    towerData.sort((a, b) => a.time - b.time);
    return towerData;
  } catch (error) {
    console.error("Error fetching tower data:", error);
    return null;
  }
};

exports.fetchAnomalyTowerData = async (towerNumber) => {
  try {
    const latestSensors = await Tower.find({
      tower: towerNumber,
      anomaly: "true",
    })
      .sort({ time: -1 })
      .limit(5)
      .select("tower city type fuelStatus temperature time powerSource -_id");
    return latestSensors;
  } catch (error) {
    console.error("Error fetching tower data:", error);
  }
};
