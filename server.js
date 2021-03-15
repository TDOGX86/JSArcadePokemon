// IMPORT
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// INSTANCE
const app = express();

// FIELDS
const port = process.env.PORT || 8000;
const username = 'arcade';
const pass = 'kPpFtrxsZ4En2zcN';
const collection = 'arcade';
const connectionString = `mongodb+srv://${username}:${pass}@cluster0.56mug.mongodb.net/${collection}?retryWrites=true&w=majority`; // Cluster might need to change

// DATABASE
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    
    // DATABASE FIELDS
    const db = client.db(collection)
    const dbName = db.collection('quotes')
    
    console.log('Connected to database:', dbName)

    // RENDER ENGINE
    app.set('view engine', 'ejs')

    // MIDDLEWARE
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))

    // CRUD HANDLERS    
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    // SERVER LISTENING
    app.listen(port, () => {
        console.log("Node is live and listening on:", port)
    })
})
