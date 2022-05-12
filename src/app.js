const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//2 usefull path that node provide us 'path'
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;
//Define path for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars(via hbs we installed) engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //setting another path than the default one named views
//setup partials directory this time we needed to require hbs and use it here
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

// app.get("", (req, res) => {
//   res.render("index", {
//     title: "Weather App",
//     pageTitle: "Weather",
//     name: "George F",
//   });
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "App-Temperature ",
    pageTitle: "Temperature",
    name: "copy right @gfrancis",
  });
});

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About Me",
//     pageTitle: "About",
//     name: "George F",
//     img: "/img/me.jpg",
//   });
// });
app.get("/about", (req, res) => {
  res.render("about", {
    title: " A propos",
    pageTitle: "A propos",
    name: "copy right @gfrancis",
    img: "/img/me.jpg",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Besoin d'aide?",
    pageTitle: "Aide",
    name: "copy right @gfrancis",
    msg: "mail a: gf75002270@gmail.com.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404_errors", {
    title: "404",
    pageTitle: "404",
    errorsMsg404: "Aucun article d'aide trouvé",
    name: "copy right @gfrancis",
  });
});

app.get("/weather", (req, res) => {
  geocode(req.query.place, (error, geocodeData = {}) => {
    if (error.hight || error.low)
      return res.send({
        geoError: `${error.low} ${error.hight}`,
      });

    forecast(geocodeData, (error, forecastData) => {
      if (error.hight || error.low)
        return res.send({
          tempError: `${error.low} ${error.hight}`,
        });

      res.send({
        location: forecastData.place,
        forecast: forecastData.weatherDesc,
        temperature: forecastData.temperature,
        feelslike: forecastData.realFeels,
        humidity: forecastData.humidity,
      });
    });
  });
});
//come at last for the other route (*)
app.get("*", (req, res) => {
  res.render("404_errors", {
    title: "404",
    pageTitle: "404",
    errorsMsg404: "Page non trouvé",
    name: "copy right @gfrancis",
  });
});

app.listen(port, () => {
  console.log(`Server is up an running on port ${port}`);
});

//verify if you have ssh: ls -a[hidden file] -l[format it in list] ~/.ssh
//create a .ssh: ssh-keygen -t <type> rsa <algorithm> -b <binary> 4096 -C "yourEmail"
//start ssh: eval "$(ssh-agent -s)"
//if everything went well you want to register the file: ssh-add -K ~/.ssh/id_rsa
//Now we need to take the content of public key and paste it on gitHub settings : cat ~/.ssh/id_rsa.pub
//Testing if our ssh have been correctly added on gitHub: ssh -T git@github.com

//heroku , we nee to set up our public key ssh to heroku: heroku keys:add
//creating our app on heroku: heroku create george-weather-app

//now lets tell heroku where to start our project "script:start inside our package.json"
//secondly we have to go to our entrypoint app.js and declare const port = process.env.PORT || 3000;

//One more thing to do is in our public/js folder with app.js there we remove in the fetch"http://localhost:3000/weather?place=" + place and replace it with: /weather?place=" + place
