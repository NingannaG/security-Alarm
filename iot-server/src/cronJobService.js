const cron = require("node-cron");
const { REFRESH_TIME } = require("./constant");
const { getRandomTower } = require("./generateDataService");
const { postData } = require("./postService");

const dataGenerateJob = cron.schedule(
  `*/${REFRESH_TIME} * * * * *`,
  async () => {
    try {
      let towerData = getRandomTower();
      await postData(towerData);
    } catch (e) {
      console.error(e);
    }
  }
);

exports.startCronJobService = dataGenerateJob;
