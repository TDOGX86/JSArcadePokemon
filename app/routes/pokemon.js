const fetch = require("node-fetch");
const pokeCard = require("../config/pokeCard")
let url = "https://pokeapi.co/api/v2/pokemon/";

// FUNCTIONS

// function to call a random pokemon from the API
function randomPokemonGenerator() {
  return Math.floor(Math.random() * 150);
}

// grab pokemon function with required stats
function grabPokemon(datas) {
  const pokemon = datas.map((data) => ({
    id: data.id,
    name: data.name,
    type: data.types.map((type) => type.type.name),
    moves: [
      data.moves[0]?.move.name ? data.moves[0].move.name : "Tackle",
      data.moves[1]?.move.name ? data.moves[1].move.name : "Tackle",
      data.moves[2]?.move.name ? data.moves[2].move.name : "Tackle",
      data.moves[3]?.move.name ? data.moves[3].move.name : "Tackle",
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
      datas.moves[0]?.move.name ? datas.moves[0].move.name : "Tackle",
      datas.moves[1]?.move.name ? datas.moves[1].move.name : "Tackle",
      datas.moves[2]?.move.name ? datas.moves[2].move.name : "Tackle",
      datas.moves[3]?.move.name ? datas.moves[3].move.name : "Tackle",
    ],
    hp: datas.stats[0].base_stat,
    attack: datas.stats[1].base_stat,
    defense: datas.stats[2].base_stat,
    speed: datas.stats[5].base_stat,
  };
}

module.exports = function (app, passport, db) {
  // jeff - fixed the bug that stopped all gen1 from appearing
  app.get("/displayteam", async (req, res) => {
    const promises = [];
    const pokemonCount = 152;
    for (let i = 1; i < pokemonCount; i++) {
      const pokeURL = `${url}${i}`;
      promises.push(fetch(pokeURL).then((res) => res.json()));
    }
    await Promise.all(promises).then((results) => {
      res.status(200).render('profile.ejs', { team: grabPokemon(results) });
    });
  });
  
  app.get("/getCards", async (req, res) => {
    const promises = [];
    const pokeURL = `${pokeCard.url}`;

    promises.push(fetch(pokeURL).then((res) => res.json()));
      
    await Promise.all(promises).then((results) => {
      res.status(200).send({ team: results });
    });
  });

  // add 6 random pokemon
  app.get("/randomOpponent", (req, res) => {
    const promises = [];
    for (let i = 0; i < 6; i++) {
      const pokeURL = url + `${randomPokemonGenerator()}`;
      promises.push(fetch(pokeURL).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      //console.log(results);
      res.send(results);
      console.log(grabPokemon(results));
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
};
