const request = require("postman-request");
const keyWeather = "e0c46059082827e47ddaf4841137b3f1";
function forecast(lat, long, callback) {
  const u = `http://api.weatherstack.com/current?access_key=${keyWeather}&query=${
    (long, lat)
  }&units=m`;
  request({ url: u, json: true }, (err, { body }) => {
    if (err) {
      callback("Poor Connection!");
    } else if (body.error) {
      callback("Error in input!");
    } else {
      const {
        weather_descriptions,
        temperature,
        feelslike,
        wind_speed,
        humidity,
        weather_icons,
      } = body.current;
      // console.log(weather_icons);
      callback(undefined, {
        str: `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. The wind speed is ${wind_speed}, and the humidity is ${humidity}.`,
        image: weather_icons,
      });
    }
  });
}

module.exports = forecast;
