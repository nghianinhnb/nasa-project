const jwt = require('jsonwebtoken');
const passport = require('passport');
const {user} = require('../../../models')
const Strategy = require('passport-google-oauth20');
const constants = require('../../../config/constants')


exports.strategy = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: constants.PATH_GOOGLE_AUTH_CALLBACK,
  },
  async function(accessToken, refreshToken, profile, callback) {
    const {name, emails} = profile
    const id = await user.findOne({email: emails[0].value}, 'id');

    if (!id) {
      console.log('create')
      id = await user.create({email: emails[0].value, name: `${name.familyName} ${name.givenName}`}, 'id')
    }

    return callback(null, id);
  }
);


exports.router = (() => {
  var router = require('express').Router();

  router.get(
    constants.PATH_GOOGLE_AUTH,
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      session: false,
    }),
    (req, res) => {},
  );

  router.get(
    constants.PATH_GOOGLE_AUTH_CALLBACK,
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      const accessToken = jwt.sign({ id: req.user.id , exp: Math.floor(Date.now() * 0.001) + 604800 }, process.env.ACCESS_TOKEN_KEY);
      const refreshToken = jwt.sign({ id: req.user.Id , exp: Math.floor(Date.now() * 0.001) + 604800 }, process.env.ACCESS_TOKEN_KEY);

      const htmlWithEmbeddedJWT = `<script>localStorage.setItem('accessToken','${accessToken}');localStorage.setItem('refreshToken','${refreshToken}');location.href='/'</script>`;
  
      res.send(htmlWithEmbeddedJWT);
    }
  );

  return router;
})()

