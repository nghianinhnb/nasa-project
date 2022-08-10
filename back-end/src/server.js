require('dotenv').config();
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const {loadPlanetsCsv} = require('./services/loadPlanet');


const PORT = process.env.PORT || 8000;


const app = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, require('./app'));


// MARK: --- Start Server ---
(async function () {
    mongoose.connection.once('open', () => {
        console.log('Connect to MongoDB successfully!')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err);
    })

    await mongoose.connect(process.env.MONGO_URL);

    // await loadPlanetsCsv();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });

})()
