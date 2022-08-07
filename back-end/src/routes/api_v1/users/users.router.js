
module.exports = (app) => {
    const userController = require('./users.controller');

    var router = require('express').Router();

    router.get('/me', userController.me);
    
    app.use('/users', router);
    
    app.post('/sign-in', userController.signIn);
    app.post('/sign-up', userController.register);
    app.post('/refresh-token', userController.refreshToken);
}
