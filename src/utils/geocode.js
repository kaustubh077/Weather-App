const request = require("postman-request");

const keyGeo =
  "pk.eyJ1Ijoia2F1c3R1YmhjaGF0dXJ2ZWRpIiwiYSI6ImNreGQ5dzFqczB3ajIyb3BkNnM4dzZmcGMifQ.nA9_nSfzvPs97Q57G-Uqxg";

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${keyGeo}`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Poor Connection!", undefined);
    } else if (res.body.features.length === 0 || !res.body.features[0]) {
      callback("Unable to find location!", undefined);
    } else {
      const placeName = res.body.features[0].place_name;
      const [long, lat] = res.body.features[0].center;
      // console.log(placeName, lat, long);
      callback(undefined, { placeName, lat, long });
    }
  });
}

module.exports = geocode;
