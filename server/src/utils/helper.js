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
