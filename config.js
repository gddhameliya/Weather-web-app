require("dotenv").config();
const constant = {
  openWeatherMap: {
    BASE_URL: process.env.BASE_URL,
    SECRETE_KEY: process.env.SECRETE_KEY,
  },
};

module.exports = constant;
