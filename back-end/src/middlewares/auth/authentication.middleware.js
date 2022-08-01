const err_vi = require("../../config/err.vi");
const constants = require('../../config/constants')

const {PATH_PLANET, PATH_LAUNCH} = constants;

const needAuthenticatedPath = {};
needAuthenticatedPath[PATH_PLANET]=true;
needAuthenticatedPath[PATH_LAUNCH]=true;


module.exports = (req, res, next) => {
    

    next();
};
