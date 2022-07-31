const passport = require('passport');
const googleOAuth = require('./GoogleOauth2');
const authentication = require('./authentication.middleware')


module.exports = (app) => {
    // MARK: --- Config Passport ---
    passport.use(googleOAuth.strategy);

        // save session to cookie and respond to browser
    passport.serializeUser((user, done) => {
        const { id, emails } = user
        done(null, { id, emails });
    });
        // read session from request cookie
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });


    // MARK: --- Apply Auth Middlewares ---
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authentication);


    // MARK: --- API ---
    app.use('/', googleOAuth.router);

    app.get('/auth/logout', (req, res) => {});
};
