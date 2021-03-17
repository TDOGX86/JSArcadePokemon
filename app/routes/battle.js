let battleSchema = require("../models/battle");
let teamSchema = require("../models/team");
module.exports = function (app, passport, db) {
  app.get("/battle", (req, res) => {
    console.log();
    console.table(Object.entries(req.headers));
    console.table(Object.entries(req.session));
    app.get("/randomOpponent", (req2, res2) => {
      teamSchema.findOneAndUpdate(
        { email: req.user.local.email },
        {
          email: req.user.local.email,
          pokemon: res2,
        }
      );
    });
  });
};
