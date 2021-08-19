//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("view engine", "ejs"); //App uses ejs as its view engine

app.get("/", function(req, res){

  var today = new Date();

  if(today.getDay() === 6 || today.getDay() === 0) {
    res.send("Yay its the weekend!");
  } else {
    res.send("Boo!");
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
