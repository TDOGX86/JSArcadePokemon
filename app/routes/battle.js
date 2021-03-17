module.exports = function (app, passport, db) {};
// Authentication middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
