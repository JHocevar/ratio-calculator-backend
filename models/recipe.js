const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  itemName: String,
  recipeName: String,
  building: { type: String, default: "none" },
  produced: Number,
  time: Number,
  ingredientNames: [String],
  ingredientAmounts: [Number]
});

module.exports = mongoose.model("recipe", recipeSchema);
