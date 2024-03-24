const { towers } = require("../data/towers");
const Tower = require("../models/tower");
const towersList = new Map();

function generateTowerData() {
  const temperature = Math.floor(Math.random() * 50) + 1;
  const powerSource = Math.random() < 0.5 ? "DG" : "Electric";
  const fuelStatus = Math.floor(Math.random() * 50) + 1;
  const time = new Date().getTime();

  return {
    temperature,
    powerSource,
    fuelStatus,
    time,
  };
}

function updateTowersListCache(towerData) {
  const { tower, powerSource, time } = towerData;
  const existingTower = towersList.get(tower);

  if (!existingTower || existingTower.powerSource !== powerSource) {
    towersList.set(tower, { lastUpdatedTime: time, powerSource });
  }
}

function findThirdAnomaly() {
  const currentTime = new Date().getTime();
  const list = [];
  for (let [key, value] of towersList) {
    const time = value.lastUpdatedTime;
    const timeDifference = (currentTime - time) / (1000 * 60 * 60); // Convert time difference to hours
    if (timeDifference >= 2) {
      list.push(key);
    }
  }
  return list;
}

function findAnomalies(data, isThirdAnomaly) {
  const { temperature, fuelStatus } = data;
  let type = "NULL";

  if (temperature > 45) {
    type = "1";
  } else if (fuelStatus < 20) {
    type = "2";
  } else if (isThirdAnomaly) {
    type = "3";
  }

  return {
    ...data,
    anomaly: type !== "NULL" ? "true" : "false",
    type,
  };
}

async function pushDataToMongoDB(towerData) {
  try {
    // Create a new Tower document
    const newTower = new Tower(towerData);
    updateTowersListCache(towerData);
    // Save the new Tower document to the specified collection for that tower
    const savedTower = await newTower.save();
    console.log("Tower data saved to MongoDB");
  } catch (error) {
    console.error("Error pushing data to MongoDB:", error);
  }
}

async function updateDataToMongoDB(towerNumber) {
  try {
    const maxTimeTowerDoc = await Tower.findOne({ tower: towerNumber })
      .sort("-time")
      .exec();

    if (!maxTimeTowerDoc) {
      console.log("No document found for the specified tower.");
      return;
    }

    if (maxTimeTowerDoc.type === "NULL") {
      maxTimeTowerDoc.anomaly = "true";
      maxTimeTowerDoc.type = "3";
      await maxTimeTowerDoc.save();
    }
    console.log("Tower data updated to MongoDB");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

async function updateAllTowers(towersListToUpdate) {
  const updatePromise = towersListToUpdate.map((tower) =>
    updateDataToMongoDB(tower)
  );
  await Promise.all(updatePromise);
}

exports.getRandomTower = function () {
  const randomIndex = Math.floor(Math.random() * towers.length);
  const selectedTower = { ...towers[randomIndex], ...generateTowerData() };
  const towersListWithThirdAnomaly = findThirdAnomaly();

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
