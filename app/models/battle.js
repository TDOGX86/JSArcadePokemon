let mongoose = require("mongoose");

// define the schema for our user model
let battleSchema = mongoose.Schema({
  email: String,
  id: Number,
  pokemon: Array,
  status: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Battle", battleSchema);
