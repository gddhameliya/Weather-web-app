require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const morgan = require("morgan");
const weatherData = require("../utils/weatherData");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get("", async (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/weather", async (req, res) => {
  let address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must enter address in search text box",
    });
  }

  weatherData(address, (error, { temperature, description, cityName } = {}) => {
    if (error) return res.json({ error: error.message });

    console.log(temperature, description, cityName);
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

app.get("*", async (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

const port = 4000 || process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}...`));
