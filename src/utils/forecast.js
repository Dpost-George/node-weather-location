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
      if (response.body.error) throw new Error(`Impossible de trouver le lieu`);
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
          low: `Problem de connection avec le serveur de temperature...`,
          hight: error,
        },
        ""
      );
    }
  });
};

module.exports = forecast;
