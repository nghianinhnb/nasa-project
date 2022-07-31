const err_vi = require("../../config/err.vi");
const constants = require('../../config/constants')

const {PATH_PLANET, PATH_LAUNCH} = constants;

const needAuthenticatedPath = {};
needAuthenticatedPath[PATH_PLANET]=true;
needAuthenticatedPath[PATH_LAUNCH]=true;


module.exports = (req, res, next) => {
    if (req.path in needAuthenticatedPath) {
        const isLoggedIn = req.isAuthenticated() && req.user;

        if (!isLoggedIn) {
            res.status(401).json({
                result: 'failed',
                reason: err_vi.ERROR_UNAUTHORIZED,
            });
            return;
        }
    }


    next();
};
