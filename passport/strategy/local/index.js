/**
 * Password Strategy
 * @method passport/strategy/local
 */

/**
 * @namespace lacalStrategy
 */

 /**
  * @external Passport Local Strategy
  */

const LocalStrategy = require('passport-local').Strategy;

/**
 * @external dotenv to create enviroment virable
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');

/**
 * @template UsernameField and PasswordField name to use insted of username and password
 */
const options = {
  usernameField: process.env.USERNAME_FIELD,
  password: process.env.PASSWORD_FIELD,
};
const passport = require('passport');
const { User } = require('../../../schema/index');

/**
 * @function passport.use Midleware to handle all request from client
 */
passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    /**
     * @function User.findOne Fetch Data from MongoDB by Email
     */
    await User.findOne({ email })
      .then(user => {
        if (user) {
          /// Comapare Client Password with Database saved password useing `bcrypt` library
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
