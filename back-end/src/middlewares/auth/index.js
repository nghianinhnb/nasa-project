const passport = require('passport');
const googleOAuth = require('./GoogleOauth2');
const Jwt = require('./TokenBased')
const authentication = require('./authentication.middleware')


module.exports = (app) => {
    // MARK: --- Config Passport ---
    passport.use(googleOAuth.strategy);
    passport.use(Jwt.strategy);


    // MARK: --- Apply Auth Middlewares ---
    app.use(passport.initialize());
    app.use(authentication);


    // MARK: --- API ---
    app.use('/', googleOAuth.router);


    app.get('/auth/logout', (req, res) => {});
};
