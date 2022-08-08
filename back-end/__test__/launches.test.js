const mongoose = require('mongoose');
const supertest = require('supertest');
const expressApp = require('../src/app');
const constants = require('../src/config/constants');


const app = supertest(expressApp);


describe(`Test GET ${constants.PATH_LAUNCH}`, () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('It should respond with 200', async () => {
        const res = await app.get(constants.PATH_LAUNCH)
                             .expect(401);
    })
})


// describe(`Test POST ${constants.PATH_LAUNCH}`, () => {
//     test('It should respond with 200', async () => {
//         const res = await app.get()
//         expect(200).toBe(200);
//     })
// })
