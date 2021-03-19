// IMPORTS
const express      = require("express");
const mongoose     = require("mongoose");
const passport     = require("passport");
const flash        = require("connect-flash");
const morgan       = require("morgan");
const cookieParser = require("cookie-parser");
const session      = require("express-session");
const path         = require('path')
const configDB     = require("./app/config/database.js");

// INSTANCE
const app = express();

// FIELDS
const port = process.env.PORT || 8100;

// DATABASE
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.error(err);
    
    require("./app/config/passport")(passport);   // passport configuration
    
    // RENDER ENGINE
    app.set('views', __dirname + '/views');
    app.set("view engine", "ejs");                // set up ejs for templating

    // MIDDLEWARE
    //app.use(morgan("dev"));                     // log every request to the console
    app.use(cookieParser());                      // read cookies (needed for auth)
    app.use(express.json());                      // get information from html forms
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));            // access public resources
    app.use(session({                             // passport sessions
        secret: "pokEmon",                        // session secret...DONT TELL ANYONE
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());                             //  for flash messages in session

    // CRUD ACCESS ROUTES
    require("./app/routes/main.js")   (app, passport, database);
    require("./app/routes/pokemon.js")(app, passport, database);
    require("./app/routes/battle.js") (app, passport, database);
  }
);

  
app.listen(port);
console.log("The magic happens on port " + port);