// IMPORT
const express        = require("express");
const mongoose       = require("mongoose");
const passport       = require("passport");
const flash          = require("connect-flash");
const morgan         = require("morgan");
const cookieParser   = require("cookie-parser");
const session        = require("express-session");
const configDB       = require("./app/config/database.js");
const fetch          = require("node-fetch");
const pokemonSchema  = require("./app/models/pokemon");

// INSTANCE
const app = express();

// FIELDS
const port =   process.env.PORT || 8100;
const url  =  `https://pokeapi.co/api/v2/pokemon/`;
let db;

// FUNCTIONS 
function randomPokemonGenerator() {
  return Math.floor(Math.random() * 150);
}

// grab pokemon function with required stats for multiple grabs
function grabPokemon(datas) {
  const pokemon = datas.map((data) => ({
    id: data.id,
    name: data.name,
    type: data.types.map((type) => type.type.name),
    moves: [
      data.moves[0].move.name ? data.moves[0].move.name : "Tackle",
      data.moves[1].move.name ? data.moves[1].move.name : "Tackle",
      data.moves[2].move.name ? data.moves[2].move.name : "Tackle",
      data.moves[3].move.name ? data.moves[3].move.name : "Tackle",
    ],
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
  }));
  return pokemon;
}

// function for testing purposes for adding a single pokemon
function getPokemon(datas) {
  return {
    id: datas.id,
    name: datas.name,
    type: datas.types.map((type) => type.type.name),
    moves: [
      datas.moves[0].move.name ? datas.moves[0].move.name : "Tackle",
      datas.moves[1].move.name ? datas.moves[1].move.name : "Tackle",
      datas.moves[2].move.name ? datas.moves[2].move.name : "Tackle",
      datas.moves[3].move.name ? datas.moves[3].move.name : "Tackle",
    ],

    hp: datas.stats[0].base_stat,
    attack: datas.stats[1].base_stat,
    defense: datas.stats[2].base_stat,
    speed: datas.stats[5].base_stat,
  };
}

// DATABASE
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err);

    db = database;
    require("./app/config/passport")(passport);   // passport configuration
    
    app.set("view engine", "ejs");                // set up ejs for templating
    app.use(morgan("dev"));                       // log every request to the console
    app.use(cookieParser());                      // read cookies (needed for auth)
    app.use(express.json());                      // get information from html forms
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));            // access public resources



    app.get("/user", (req, res) => {              // grabs 6 random pokemon 
      const promises = [];
      for (let i = 0; i < 6; i++) {
        const pokeURL = url + `${randomPokemonGenerator()}`;
        promises.push(fetch(pokeURL).then((res) => res.json()));
      }
      Promise.all(promises).then((results) => {
        //console.log(results);
        console.log(grabPokemon(results));
      });
      res.status(200).send({ msg: "Success!" });
    });

    app.get("/user/add/:id", (req, res) => {      // adds one poke to DB 
      let param = req.params.id;
      fetch(url + param)
      .then((res) => res.json())
      .then((data) => {
        pokemonSchema.create(getPokemon(data), function (err, small) {
          if (err) return handleError(err);
        });
      });
      res.status(200).send({ msg: "Success!" });
    });
    
    app.use(session({                             // passport sessions
        secret: "pokEmon",                        // session secret...DONT TELL ANYONE
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());                             //  for flash messages in session
    
    //ACCESS ROUTES
    require("./app/routes/main.js")(app, passport, db);
    require("./app/routes/pokemon.js")(app, passport, db);
    require("./app/routes/battle.js")(app, passport, db);
  }
);

app.listen(port);
console.log("The magic happens on port " + port);