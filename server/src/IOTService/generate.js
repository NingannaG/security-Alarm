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

function updateTowersList(towerData) {
  if (towersList.has(towerData.tower)) {
    const oldTowerData = towersList.get(towerData.tower);
    if (oldTowerData.powerSource !== towerData.powerSource) {
      towersList.set(towerData.tower, {
        lastUpdatedTime: towerData.time,
        powerSource: towerData.powerSource,
      });
    }
  } else {
    towersList.set(towerData.tower, {
      lastUpdatedTime: towerData.time,
      powerSource: towerData.powerSource,
    });
  }
}

function findAnomalies(data) {
  const { temperature, fuelStatus, powerSource, time } = data;
  const currentTime = new Date().getTime();
  const timeDifference = (currentTime - time) / (1000 * 60 * 60); // Convert time difference to hours

  let anomaly = false;
  let type = [];

  if (temperature > 45) {
    anomaly = true;
    type.push(1);
  }

  if (fuelStatus < 20) {
    anomaly = true;
    type.push(2);
  }

  //   if (powerSource === "DG" && timeDifference >= 2) {
  //     anomaly = true;
  //     type.push(3);
  //   }

  data.anomaly = anomaly;
  data.type = type;
  return data;
}

async function pushDataToMongoDB(towerData) {
  try {
    // Create a new Tower document
    const newTower = new Tower(towerData);
    updateTowersList(towerData);
    // Save the new Tower document to the specified collection for that tower
    const savedTower = await newTower.save();
    console.log("Tower data saved to MongoDB:");
  } catch (error) {
    console.error("Error pushing data to MongoDB:", error);
  }
}

exports.getRandomTower = function () {
  const randomIndex = Math.floor(Math.random() * towers.length);
  let selectedTower = towers[randomIndex];
  selectedTower = { ...selectedTower, ...generateTowerData() };
  const selectedTowerWithAnomalies = findAnomalies(selectedTower);

  pushDataToMongoDB(selectedTowerWithAnomalies);
};
