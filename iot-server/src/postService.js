const axios = require("axios");
const { BACKEND_URL, UPDATE_PATH } = require("./constant");

async function postData(dataToSend) {
  try {
    const reponse = await axios.post(
      `${BACKEND_URL}${UPDATE_PATH}`,
      dataToSend
    );
    console.log(reponse.data);
  } catch (error) {
    console.error("Error posting data, check backend server is running or not");
  }
}

module.exports = { postData };
