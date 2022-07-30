const passport = require('passport');
const Strategy = require('passport-google-oauth20');
const constants = require('../../../config/constants')

exports.strategy = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: constants.PATH_GOOGLE_AUTH_CALLBACK,
  },
  function(accessToken, refreshToken, profile, callback) {
    console.log({profile});

    return callback(null, profile);
  }
);


exports.router = (() => {
  var router = require('express').Router();

  router.get(
    constants.PATH_GOOGLE_AUTH,
    passport.authenticate('google', {
      scope: ['email'],
    }),
    (req, res) => {},
  );

  router.get(
    constants.PATH_GOOGLE_AUTH_CALLBACK,
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
    }
  );

  return router;
})()

