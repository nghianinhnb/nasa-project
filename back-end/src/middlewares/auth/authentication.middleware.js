const passport = require('passport');
const err_vi = require("../../config/err.vi");
const constants = require('../../config/constants')

const {PATH_PLANET, PATH_LAUNCH} = constants;

const needAuthenticatedPath = {};
needAuthenticatedPath[PATH_PLANET]=true;
needAuthenticatedPath[PATH_LAUNCH]=true;


module.exports = (req, res, next) => {
    if (req.path in needAuthenticatedPath) {
        passport.authenticate('jwt', { session: false })(req, res, next)
    } else next();
};
