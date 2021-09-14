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

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item ({
  name: "Welcome  to your todolist!"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item."
});

const item3 = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res){
  const day = date.getDay();

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted all items");
        }
      });
      res.redirect("/");
    } else {
        res.render("list", {listTitle: day, newListItems: foundItems});
    }
  });
});

app.get("/:customListName", function(req, res){
  const customListName = req.params.customListName;

  const list = new List({
    name: customListName,
    items: defaultItems
  });

  list.save();
})

app.post("/", function(req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", function(req,res){
  const deletingItem = req.body.deletedItem;

  Item.findByIdAndRemove(deletingItem, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted item");
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
