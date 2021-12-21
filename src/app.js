const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Paths setup for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Express path config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Express public dir config
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Kaustubh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Kaustubh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Help is provided.",
    name: "Kaustubh",
  });
});
app.get("/weather", (req, res) => {
  console.log(req.query.address);
  if (!req.query.address) {
    return res.send({ err: "Please provide a valid address!" });
  }
  geocode(req.query.address, (err, { placeName, lat, long } = {}) => {
    if (err) return res.send({ err });
    forecast(lat, long, (err, data) => {
      if (err) return res.send({ err });

      res.send({
        location: placeName,
        weather: data.str,
        image: data.image,
      });
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Kaustubh",
    errorText: "Help Article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Kaustubh",
    errorText: "Page not found",
  });
});
app.listen(port, () => {
  console.log(`Server up on ${port}`);
});
