const express = require("express");
const mongoose = require("mongoose");
const recipe = require("./models/recipe");
const app = express();
const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectionString = "mongodb+srv://dbUser:dbUserPassword@maincluster-wqbcy.mongodb.net/test?retryWrites=true&w=majority"; // prettier-ignore
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }); // prettier-ignore

// Simply returns all items
app.get("/api/recipes/all", (req, res) => {
  console.log("Got a request for all recipes");
  recipe.find({}).then(result => res.send(result));
});

// Get an item by name, and return all items with that name
app.get("/api/recipes/:name", (req, res) => {
  // console.log("GOT A REQUEST", new Date(), "item name is", req.params.name);
  recipe.find({ itemName: req.params.name }).then(result => {
    res.send(result);
  });
});

// Posts an item by name, checks to make sure the recipe name is unique
app.post("/api/recipes/:name", (req, res) => {
  console.log("Recieved item to post: ", req.params.name);
  recipe.find({ recipeName: req.params.recipeName }).then(result => {
    if (result.length === 0) {
      // The item does not exist, add it
      let item = new recipe(req.body);
      item.save();
      res.send("Successfully saved item");
    } else res.send("Item already exists, did nothing");
  });
});

app.listen(PORT, () => {
  console.log(`Example app running on port ${PORT}`);
});
