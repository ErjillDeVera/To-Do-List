//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var item = [];

app.set("view engine", "ejs"); //App uses ejs as its view engine

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {day: day, newListItem: item});

});

app.post("/", function(req, res) {
  item = req.body.newItem;

  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
