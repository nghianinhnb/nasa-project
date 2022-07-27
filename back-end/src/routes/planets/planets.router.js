
module.exports = (app) => {
    const planetsController = require('./planets.controller');

    var router = require('express').Router();

    router.get('/', planetsController.getAll);

    app.use('/planets', router);
}