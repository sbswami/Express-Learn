const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const bcrypt = require('bcryptjs');
const options = {
  usernameField: process.env.USERNAME_FIELD,
  password: process.env.PASSWORD_FIELD,
};
const passport = require('passport');
const { User } = require('../../../schema/index');

passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    await User.findOne({ email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) done(err);
            if (isMatch) return done(null, user);
            return done(null, false);
          });
        }
      })
      .catch(err => done(err));
  })
);
