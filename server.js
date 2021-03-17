// IMPORT
const express = require("express");
const port = process.env.PORT || 8100;
const mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// INSTANCE
const app = express();

// Database info
var configDB = require("./app/config/database.js");
var db;
// DATABASE
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.log(err);
    db = database;

    //ACCESS ROUTES
    require("./app/routes/main.js")(app, passport, db);
    require("./app/routes/pokemon.js")(app, passport, db);
  }
);

require("./app/config/passport")(passport); // passport configuration

app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // access public resources
app.set("view engine", "ejs"); // set up ejs for templating

app.use(
  session({
    // passport sessions
    secret: "pokEmon", // session secret...DONT TELL ANYONE
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //  for flash messages in session

app.listen(port);
console.log("The magic happens on port " + port);
