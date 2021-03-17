let battleSchema = require("../models/battle");
let teamSchema = require("../models/team");
const fetch = require("node-fetch");
module.exports = function (app, passport, db) {
  app.get("/battle", (req, res) => {
    console.log("here");
    res.status(200).send({ msg: "Success!" });
  });
};
