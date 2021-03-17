// IMPORT
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const fetch = require("node-fetch");
const port = process.env.PORT || 8100;
var mongoose = require("mongoose");
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

// FUNCTIONS 

// function to call a random pokemon from the API
function randomPokemonGenerator() {
  return Math.floor(Math.random() * 150);
}
// DATABASE
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.log(err);
    db = database;
    //ACCESS ROUTES
    require("./app/routes/main.js")(app, passport, db);

    // app.get("/user", (req,res) => {
    //     fetch("https://pokeapi.co/api/v2/pokemon/" +randomPokemonGenerator())
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const pokemon = {
    //             id: data.id,
    //             name: data.name,
    //             type: data.types.map((type) => type.type.name),
    //             moves: [data.moves[0].move.name, data.moves[1].move.name, data.moves[2].move.name, data.moves[3].move.name],
    //             hp: data.stats[0].base_stat,
    //             attack: data.stats[1].base_stat,
    //             defense: data.stats[2].base_stat
    //         };
    //         console.log(pokemon);
    //     })
    //     .catch(error => { console.error(error)})
    //     res.status(200).send({ msg: "Success!"})
    // })

    // app.get("/user", (req,res) => {
    //     for (let i=0; i<5; i++) {
    //         fetch("https://pokeapi.co/api/v2/pokemon/" +randomPokemonGenerator())
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             const pokemon = {
    //                 id: data.id,
    //                 name: data.name,
    //                 type: data.types.map((type) => type.type.name),
    //                 moves: [data.moves[0].move.name, data.moves[1].move.name, data.moves[2].move.name, data.moves[3].move.name],
    //                 hp: data.stats[0].base_stat,
    //                 attack: data.stats[1].base_stat,
    //                 defense: data.stats[2].base_stat
    //             };   
    //             console.log(pokemon);
    //         })
    //     }
    //     res.status(200).send({ msg: "Success!" });
        
    // })

    app.get("/user", (req, res) => {
      const promises = [];
      for (let i = 0; i < 6; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonGenerator()}`;
        promises.push(fetch(url).then((res) => res.json()));
      }
      Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
          id: data.id,
          name: data.name,
          type: data.types.map((type) => type.type.name),
          moves: [
            data.moves[0].move.name,
            data.moves[1].move.name,
            data.moves[2].move.name,
            data.moves[3].move.name,
          ],
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
        }));
        console.log(pokemon);
      });
      res.status(200).send({ msg: "Success!" });
    });
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
