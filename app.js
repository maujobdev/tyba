"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//caragr rutas
var loginRoutes = require("./routes/login");
var userRoutes = require("./routes/user");
var logRoutes = require("./routes/log");
var placesRoutes = require("./routes/places");

//middlewares
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json({ limit: "1000mb", extended: true })); //convierte la peticion a un objeto json

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//rutas
app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/log", logRoutes);
app.use("/places", placesRoutes);

module.exports = app;
