//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("view engine", "ejs"); //App uses ejs as its view engine

app.get("/", function(req, res){

  var today = new Date();
  var day = "";

  switch (today.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day= "Friday";
      break;
    case 6:
      day ="Saturday";
      break;
    default:
      console.log("Error: Current day is equal to: " + currentDay);
  }
  res.render("list", {day: day});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
