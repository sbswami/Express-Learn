const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

require("./connection/mongoose");
app.use(passport.initialize());
app.use(passport.session());

require("./passport/strategy/jwt/index");
require("./passport/strategy/local/index");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const users = require("./routes/users");

app.use("/users", users);

module.exports = app;
