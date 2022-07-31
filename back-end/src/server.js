require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const rfs = require('rotating-file-stream');
const cookieSession = require('cookie-session');
const {loadPlanetsCsv} = require('./services/loadPlanet');


const PORT = process.env.PORT || 8000;


const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// write log to file;
app.use(morgan(
    ':remote-addr - [:date] ":method :url" :status :res[content-length] :total-time[0] ms ":user-agent"',
    { 
        stream: rfs.createStream("access.log", {
            size: "10M", // rotate every 10 MegaBytes written
            interval: "1d", // rotate daily
            compress: "gzip", // compress rotated files
            path: path.join(__dirname, '..', 'log'),
        }) 
    }
));
app.use(cookieSession({
    name: 'session',
    maxAge: 60 * 1000,
    keys: [ process.env.COOKIE_KEY ]
}))
app.use(express.json());


require('./middlewares/auth')(app);
require('./routes/api_v1')(app);


// MARK: --- Serve Front-End Web App ---
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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
