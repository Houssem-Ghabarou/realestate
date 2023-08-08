const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY;

passport.use(
  "ADMIN",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user || user.role !== "ADMIN") {
        return done(null, false, { message: "Invalid token" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
