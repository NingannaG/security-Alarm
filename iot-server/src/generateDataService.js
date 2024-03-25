const { towers } = require("./constant");

function generateRandomTowerData() {
  const temperature = Math.floor(Math.random() * 50) + 1;
  const powerSource = Math.random() < 0.5 ? "DG" : "Electric";
  const fuelStatus = Math.floor(Math.random() * 50) + 1;
  const time = new Date();

  return {
    temperature,
    powerSource,
    fuelStatus,
    time,
  };
}

exports.getRandomTower = function () {
  try {
    const randomIndex = Math.floor(Math.random() * towers.length);
    const selectedTower = {
      ...towers[randomIndex],
      ...generateRandomTowerData(),
    };
    return selectedTower;
  } catch (e) {
    console.error("Error in generating tower data");
  }
};
