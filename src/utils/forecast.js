const request = require("request");
const chalk = require("chalk");

const forecast = (object, callback) => {
  const { place, lat, lng } = object; //37.8267,-122
  //console.log(lat, lng);
  const url = `http://api.weatherstack.com/current?access_key=b3351b6aeffc90cc6a328fbcd0dac831&query=${lat},${lng}&unit=m`;
  //console.log(url);//${lat},${lng}
  request({ url: url, json: true }, (error, response) => {
    //json:true convert directly to JSON
    try {
      if (response.body.error) throw new Error(`Unable to find location`);
      const data = response.body.current;
      if (object.place)
        callback("", {
          place,
          weatherDesc: data.weather_descriptions[0],
          temperature: data.temperature,
          realFeels: data.feelslike,
        });
    } catch (error) {
      callback(
        {
          low: `Connection issue with weather server...`,
          hight: error,
        },
        ""
      );
    }
  });
};

module.exports = forecast;
