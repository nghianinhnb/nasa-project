const passport = require('passport');
const googleOAuth = require('./GoogleOauth2');


module.exports = (app) => {
    passport.use(googleOAuth.strategy);

    app.use(passport.initialize());
    
    app.use('/', googleOAuth.router);
    
    app.get('/auth/logout', (req, res) => {});
};
