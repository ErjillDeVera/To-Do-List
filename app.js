//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs"); //App uses ejs as its view engine

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = {
  name: String
};


app.get("/", function(req, res){

  const day = date.getDay();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  console.log(req.body);

  if (req.body.button === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
