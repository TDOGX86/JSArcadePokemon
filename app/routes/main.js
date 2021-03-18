module.exports = function (app, passport, db) {
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
};
// Authentication middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}
