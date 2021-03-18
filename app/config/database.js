const username = "arcade";
const pass = "bootcamp2020b!";
const collection = "arcade";

// const connectionString = `mongodb+srv://${username}:${pass}@cluster0.56mug.mongodb.net/${collection}?retryWrites=true&w=majority`; // Cluster might need to change

const connectionString = `mongodb+srv://dkwon23:HelloWorld!@cluster0.hvpzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = {
  url: connectionString
};