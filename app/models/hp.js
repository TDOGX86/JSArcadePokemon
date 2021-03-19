let mongoose = require("mongoose");

// define the schema for our user model
let hpSchema = mongoose.Schema({
  email: String,
  hp: String,
  attack: String,
  defense: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Hp", hpSchema);
