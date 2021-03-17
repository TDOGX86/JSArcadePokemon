let mongoose = require("mongoose");

// define the schema for our user model
let teamSchema = mongoose.Schema({
  email: String,
  pokemon: Array,
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Team", teamSchema);
