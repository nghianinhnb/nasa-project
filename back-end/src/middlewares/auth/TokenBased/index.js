const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


exports.strategy = new Strategy({
        secretOrKey: process.env.ACCESS_TOKEN_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, function(jwt_payload, done) {
        done(null, jwt_payload);
    }
);
