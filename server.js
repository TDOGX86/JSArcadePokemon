// IMPORT
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const fetch = require("node-fetch");

// INSTANCE
const app = express();

// FIELDS
const port = process.env.PORT || 8000;
const username = 'arcade';
const pass = 'bootcamp2020b!';
const collection = 'arcade';
const connectionString = `mongodb+srv://${username}:${pass}@cluster0.56mug.mongodb.net/${collection}?retryWrites=true&w=majority`; // Cluster might need to change

// DATABASE
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    
    // DATABASE FIELDS
    const db = client.db(collection)
    const dbName = db.collection('quotes')
    
    console.log('Connected to database')

    // RENDER ENGINE
    app.set('view engine', 'ejs')

    // MIDDLEWARE
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use('/public', express.static('public'))

    // CRUD HANDLERS    
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

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
    //             console.log(pokemon)
    //         })
    //         .catch(error => { console.error(error)})
    //         res.status(200).send({ msg: "Success!"});
    //     }
    // })

    app.get("/user", (req, res) => {
        const promises = [];
        for (let i = 0; i < 6; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonGenerator()}` 
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then(results => {
            const pokemon = results.map ((data) => ({
                id: data.id,
                name: data.name,
                type: data.types.map((type) => type.type.name),
                moves: [ data.moves[0].move.name, data.moves[1].move.name, data.moves[2].move.name, data.moves[3].move.name,],
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
            }))
            console.log(pokemon)
        });
        res.status(200).send({ msg: "Success!"})
    })

    // function to call a random pokemon from the API 
    function randomPokemonGenerator () {
        return Math.floor(Math.random() * 150)
    }

    // SERVER LISTENING
    app.listen(port, () => {
        console.log("Node is live and listening on:", port)
    })
})