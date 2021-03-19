const fetch         = require("node-fetch");
const pokeCard      = require("../config/pokeCard");
const pokemonSchema = require("../models/pokemon");
const battleSchema  = require("../models/battle.js");
let url = "https://pokeapi.co/api/v2/pokemon/";

// function to call a random pokemon from the API
function randomPokemonGenerator() {
  return Math.ceil(Math.random() * 150);
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

module.exports = function (app, passport, db) {
  app.get("/pokemon", (req, res) => {
    pokemonSchema.find({})
      .then(result => {
        res.render('pokemon.ejs', { pokemon: result })
      })
  });

  app.get("/cool", isLoggedIn, async (req, res) => {
    let team = "1-2-3-4-5-6".split("-");
    let randomOpponent = new Array(6)
      .fill()
      .map((_) => randomPokemonGenerator());
    let promises = [...team, ...randomOpponent].map((num) => {
      return fetch(url + num).then((info) => info.json());
    });
    await Promise.all(promises).then( async (team) => {
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
        res.render("pokemon.ejs", { newBattle });
      })
      .catch((err) => console.error(err.message));
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
    await Promise.all(promises).then(async (team) => {
      let filter = {
        email: req.user.local.email,
      }
      let newBattle = {
        ...filter,
        player1: grabPokemon(team).slice(0, 6),
        player2: grabPokemon(team).slice(6),
      }
      await battleSchema.updateOne({ ...filter }, newBattle, {
        upsert: true,
      });
      res.render('index.ejs')
    })
    .catch((err) => console.error(err.message));
  });
};

// Authentication middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}
