const request = require("request");
const chalk = require("chalk");

const geocode = (placeName, callback) => {
  const urlGeocode = `
  https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    placeName
  )}.json?access_token=pk.eyJ1IjoiZHBvc3QiLCJhIjoiY2wyczc4aHQ3M2NibDNsbHdwaTB5d3U0ciJ9.IxW_de2EzvoQB9r5JeDsYQ&limit=1`;
  //console.log(urlGeocode); //${encodeURIComponent(placeName)}
  //Los%20Angeles ${placeName} //encodeURIComponent is very usefull when we have names with special characters in the URL.
  request({ url: urlGeocode, json: true }, (error, response) => {
    try {
      if (response.body.features.length === 0)
        throw new Error(`Unable to find location. try again!`);
      const [data] = response.body.features;
      const [lng, lat] = data.center;
      const place = data.place_name;
      callback("", {
        place,
        lat,
        lng,
      });
    } catch (error) {
      callback(
        {
          low: `Connection issue with geocode server...`,
          hight: error,
        },
        ""
      );
    }
  });
};

module.exports = geocode;
