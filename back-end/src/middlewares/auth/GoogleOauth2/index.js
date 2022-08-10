const passport = require('passport');
const {user} = require('../../../models');
const err_vi = require('../../../config/err.vi');
const Strategy = require('passport-google-oauth20');
const constants = require('../../../config/constants');
const authHelper = require('../../../utils/authHelpers');


const googleAuthCallbackURL = `${process.env.HOST_NAME ? process.env.HOST_NAME + ':' + process.env.PORT : ''} ${constants.PATH_GOOGLE_AUTH_CALLBACK}`;

exports.strategy = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: googleAuthCallbackURL,
  },
  async function(accessToken, refreshToken, profile, callback) {
    const {name, emails} = profile

    try {
      const id = await user.findOne({email: emails[0].value}, 'id');
      
      if (!id) {
        id = await user.create({email: emails[0].value, name: `${name.familyName} ${name.givenName}`}, 'id');
      }

      return callback(null, id);

    } catch(err) {
      return callback(err, undefined);
    }
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
    async (req, res) => {
      const userId = req.user.id

      if (!userId) {
        res.status(400).json({
          result: 'failed',
          err: 'ERROR_MISSING_PARAMETERS',
          reason: err_vi.ERROR_MISSING_PARAMETERS,
        });
        return;
      }

      try {
        const accessToken = authHelper.generateAccessToken(userId);
        const refreshToken = authHelper.generateRefreshToken();
  
        await user.updateOne({id: userId}, {refreshToken: refreshToken})

        const storingTokenScript = authHelper.storingTokenScript(accessToken, refreshToken);
        res.send( storingTokenScript );
        
      } catch(err) {
        res.status(500).json({
          result: 'failed',
          err: err,
          reason: err.ERROR_INTERNAL,
        })
      }

    }
  );

  return router;
})()

