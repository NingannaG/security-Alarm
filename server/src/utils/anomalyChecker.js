const towersList = new Map();
const Tower = require("../models/tower");

getThirdAnomalyTowersList = () => {
  const currentTime = new Date().getTime();
  const thirdAnomalyTowers = [];
  for (let [key, value] of towersList) {
    const time = new Date(value.lastUpdatedTime).getTime();
    const timeDifference = (currentTime - time) / (1000 * 60 * 60); // Convert time difference to hours
    if (timeDifference >= 2) {
      thirdAnomalyTowers.push(key);
    }
  }
  return thirdAnomalyTowers;
};

updateAllTowers = async (towersToUpdate) => {
  try {
    const updatePromises = towersToUpdate.map((tower) =>
      updateDataToMongoDB(tower)
    );
    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating towers:", error);
  }
};

updateTowersListCache = (towerData) => {
  const { tower, powerSource, time } = towerData;
  const existingTower = towersList.get(tower);

  if (!existingTower || existingTower.powerSource !== powerSource) {
    towersList.set(tower, { lastUpdatedTime: time, powerSource });
  }
};

findAnomalies = (data, isThirdAnomaly) => {
  const { temperature, fuelStatus } = data;
  let type = "-";

  if (temperature > 45) {
    type = "1";
  } else if (fuelStatus < 20) {
    type = "2";
  } else if (isThirdAnomaly) {
    type = "3";
  }

  return {
    ...data,
    anomaly: type !== "-" ? "true" : "false",
    type,
  };
};

pushDataToMongoDB = async (towerData) => {
  try {
    // Create a new Tower document
    const newTower = new Tower(towerData);
    updateTowersListCache(towerData);
    // Save the new Tower document to the specified collection for that tower
    await newTower.save();
    console.log("Tower data saved to MongoDB");
  } catch (error) {
    console.error("Error pushing data to MongoDB:", error);
  }
};

updateDataToMongoDB = async (towerNumber) => {
  try {
    const maxTimeTowerDoc = await Tower.findOne({ tower: towerNumber })
      .sort("-time")
      .exec();

    if (!maxTimeTowerDoc) {
      console.log("No document found for the specified tower.", towerNumber);
      return;
    }

    if (maxTimeTowerDoc.type === "-") {
      maxTimeTowerDoc.anomaly = "true";
      maxTimeTowerDoc.type = "3";
      await maxTimeTowerDoc.save();
    }
    console.log("Tower data updated to MongoDB");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

module.exports.detectAnomalyAndPostData = (selectedTower) => {
  const towersListWithThirdAnomaly = getThirdAnomalyTowersList();

  // Check if the selected tower is not in the list of towers with the third anomaly
  if (!towersListWithThirdAnomaly.includes(selectedTower.tower)) {
    // Update all towers if there are towers with the third anomaly
    if (towersListWithThirdAnomaly.length > 0) {
      updateAllTowers(towersListWithThirdAnomaly);
    }
  }

  // Check if the tower has the third anomaly based on power source and other conditions
  const hasThirdAnomaly =
    towersListWithThirdAnomaly.includes(selectedTower.tower) &&
    selectedTower.powerSource ===
      towersList.get(selectedTower.tower).powerSource;

  // Generate tower data with anomalies based on conditions
  const selectedTowerWithAnomalies = findAnomalies(
    selectedTower,
    hasThirdAnomaly
  );

  // Push the tower data with anomalies to MongoDB
  pushDataToMongoDB(selectedTowerWithAnomalies);
};
