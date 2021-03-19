// IMPORTS
const express      = require("express");
const mongoose     = require("mongoose");
const passport     = require("passport");
const flash        = require("connect-flash");
const morgan       = require("morgan");
const cookieParser = require("cookie-parser");
const session      = require("express-session");
const configDB     = require("./app/config/database.js");

// INSTANCE
const app = express();

// FIELDS
const port = process.env.PORT || 8100;

// DATABASE
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.error(err);

    const fetch         = require("node-fetch");
    const pokemonTCG    = require("pokemontcgsdk");
    const pokeCard      = require("./app/config/pokeCard");
    const pokemonSchema = require("./app/models/pokemon");
    const battleSchema  = require("./app/models/battle.js");
    let url = "https://pokeapi.co/api/v2/pokemon/";
    
    require("./app/config/passport")(passport);   // passport configuration
    
    // RENDER ENGINE
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
    //====================LANDING=========================
    app.get("/", function (req, res) {
      res.render("index.ejs");
    });
    //====================PROFILE=========================
    app.get("/profile", function (req, res) {
      res.render("profile.ejs", {
        user: req.user,
      });
    });
    //====================Pokemon=========================
    app.get("/pokemon", function (req, res) {
      res.render("pokemon.ejs");
    });
    //====================LOGOUT=========================
    app.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/");
    });
    //====================LOGIN FORM=========================
    app.get("/login", function (req, res) {
      res.render("login.ejs", { message: req.flash("loginMessage") });
    });
    //====================AUTHENTICATE LOGIN=========================
    app.post(
      "/login",
      passport.authenticate("local-login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true,
      })
    );
    //====================SIGNUP FORM=========================
    app.get("/signup", function (req, res) {
      res.render("signup.ejs", { message: req.flash("signupMessage") });
    });
    //====================AUTHENTICATE SIGNUP=========================
    app.post(
      "/signup",
      passport.authenticate("local-signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true,
      })
    );
    //====================REMOVE ACCOUNT=========================

    app.get("/unlink/local", isLoggedIn, function (req, res) {
      var user = req.user;
      user.local.email = undefined;
      user.local.password = undefined;
      user.save(function (err) {
        res.redirect("/profile");
      });
    });

    app.get("/displayteam", async (req, res) => {
      const promises = [];
      const promisesCards = [];
      const monsterNames = [];
      const pokemonCount = 152;
  
      for (let i = 1; i < pokemonCount; i++) {
        const pokeURL = `${url}${i}`;
        promises.push(fetch(pokeURL).then((res) => res.json()));
      }
  
      await Promise.all(promises).then((results) => {
        results.forEach(pokemon => monsterNames.push(pokemon.name))
      });
  
      pokemonTCG.configure({ apikey: pokeCard.apikey })
  
      for (const monster of monsterNames) {
        promisesCards.push(pokemonTCG.card.where({ q: `name:${monster.split("/-|'|\./gi")[0]}` })
          .then(result => result.data[0]?.images?.small)
      )};
  
      await Promise.all(promisesCards).then((results) => {
        res.status(200).send({ cards: results })
      });
    });
  
    app.get("/cool", isLoggedIn, async (req, res) => {
      let team = "1-2-3-4-5-6".split("-");
      let randomOpponent = new Array(6)
        .fill()
        .map((_) => randomPokemonGenerator());
      let promises = [...team, ...randomOpponent].map((num) => {
        return fetch(url + num).then((info) => info.json());
      });
      await Promise.all(promises)
        .then(async (team) => {
          let filter = {
            email: req.user.local.email,
          };
          let newBattle = {
            ...filter,
            player1: grabPokemon(team).slice(0, 6),
            player2: grabPokemon(team).slice(6),
          };
          await battleSchema.updateOne({ ...filter }, newBattle, {
            upsert: true,
          });
          res.status(200).render("pokemon.ejs", newBattle);
        })
        .catch((err) => console.log(err));
    });
  
    // add 6 random pokemon
    app.get("/randomOpponent", (req, res) => {
      const promises = [];
      for (let i = 0; i < 6; i++) {
        const pokeURL = url + `${randomPokemonGenerator()}`;
        promises.push(fetch(pokeURL).then((res) => res.json()));
      }
      Promise.all(promises).then((results) => {
        res.send(grabPokemon(results));
      });
    });
  
    // add a single pokemon to database
    app.get("/user/add/:id", (req, res) => {
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
  
    // post grab teams
    app.post("/team", isLoggedIn, async (req, res) => {
      let team = req.body.team.split("-");
      let randomOpponent = new Array(6)
        .fill()
        .map((_) => randomPokemonGenerator());
      let promises = [...team, ...randomOpponent].map((num) => {
        return fetch(url + num).then((info) => info.json());
      });
      await Promise.all(promises)
        .then(async (team) => {
          let filter = {
            email: req.user.local.email,
          };
          let newBattle = {
            ...filter,
            player1: grabPokemon(team).slice(0, 6),
            player2: grabPokemon(team).slice(6),
          };
          await battleSchema.updateOne({ ...filter }, newBattle, {
            upsert: true,
          });
          res.status(200).render("pokemon.ejs", newBattle);
        })
        .catch((err) => console.log(err));
    });

    app.get("/battle", (req, res) => {
      console.log("here");
      res.status(200).send({ msg: "Success!" });
    });
  }
);

// function to call a random pokemon from the API
function randomPokemonGenerator() {
  return Math.floor(Math.random() * 150);
}

// function for testing purposes for adding a single pokemon
function getPokemon(datas) {
  return {
    id: datas.id,
    name: datas.name,
    type: datas.types.map((type) => type.type.name),
    moves: [
      datas.moves[0]?.move.name,
      datas.moves[1]?.move.name,
      datas.moves[2]?.move.name,
      datas.moves[3]?.move.name,
    ],
    imgs: [datas.sprites.front_default, datas.sprites.back_default],
    hp: datas.stats[0].base_stat,
    attack: datas.stats[1].base_stat,
    defense: datas.stats[2].base_stat,
    speed: datas.stats[5].base_stat,
  };
}

// grab pokemon function with required stats
function grabPokemon(datas) {
  const pokemon = datas.map((data) => getPokemon(data));
  return pokemon;
}

// Authentication middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}

app.listen(port);
console.log("The magic happens on port " + port);