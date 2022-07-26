const request = require("request");
const constant = require("../config");

const weatherData = (address, callback) => {
  const url =
    constant.openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&APPID=" +
    constant.openWeatherMap.SECRETE_KEY;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't fetch data from open weather map api ", undefined);
    } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
      callback("Unable to find required data, try another location", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        cityName: body.name,
      });
    }
  });
};

module.exports = weatherData;
