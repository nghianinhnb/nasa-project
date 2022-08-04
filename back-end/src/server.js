require('dotenv').config();
const mongoose = require('mongoose');
const {loadPlanetsCsv} = require('./services/loadPlanet');

const app = require('./app')


const PORT = process.env.PORT || 8000;


// MARK: --- Start Server ---
(async function () {
    mongoose.connection.once('open', () => {
        console.log('Connect to MongoDB successfully!')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err);
    })

    await mongoose.connect(process.env.MONGO_URL);

    await loadPlanetsCsv();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });

})()
