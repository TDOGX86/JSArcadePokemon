const username = 'arcade';
const pass = 'bootcamp2020b!';
const collection = 'arcade';
// const connectionString = `mongodb+srv://Shawn_charles:a90db52b@cluster0.ctxg1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectionString = `mongodb+srv://${username}:${pass}@cluster0.56mug.mongodb.net/${collection}?retryWrites=true&w=majority`; // Cluster might need to change

module.exports = {
    'url' : connectionString,
    'dbName': 'demo'
};