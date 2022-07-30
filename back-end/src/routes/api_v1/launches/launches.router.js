
module.exports = (app) => {
    const launchesController = require('./launches.controller');

    var router = require('express').Router();

    router.get('/', launchesController.getAll);
    router.post('/', launchesController.create);
    router.put('/', launchesController.abort)

    app.use('/launches', router);
}