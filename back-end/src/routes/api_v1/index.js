
module.exports = (app) => {
    var router = require('express').Router();

    require('./planets/planets.router')(router);
    require('./launches/launches.router')(router);

    app.use('/api/v1', router);
}