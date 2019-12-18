const JWTStrategy = require('passport-jwt').Strategy;
require('dotenv').config();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};

const passport = require('passport');
const { User } = require('../../../schema/index');

passport.use(
  new JWTStrategy(options, async function(jwtPayload, done) {
    await User.findById({ _id: jwtPayload.id })
      .then(user => {
        if (user)
          return done(null, user);
        return done(null, false);
      })
      .catch(err => done(err));
  })
);
