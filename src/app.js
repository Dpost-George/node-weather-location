const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//2 usefull path that node provide us 'path'
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

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

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    pageTitle: "Weather",
    name: "George F",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    pageTitle: "About",
    name: "George F",
    img: "/img/me.jpg",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need-Help?",
    pageTitle: "Help",
    name: "George F.",
    msg: "Start with our FAQ before opening a ticket.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404_errors", {
    title: "404",
    pageTitle: "404",
    errorsMsg404: "Help article not found",
    name: "George F.",
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
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  res.send({
    product: [],
  });
});
//come at last for the other route (*)
app.get("*", (req, res) => {
  res.render("404_errors", {
    title: "404",
    pageTitle: "404",
    errorsMsg404: "Page not found",
    name: "George F.",
  });
});

app.listen(3000, () => {
  console.log("Server is up an running on port 3000");
});
