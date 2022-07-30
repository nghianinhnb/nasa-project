require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const mongoose = require('mongoose');

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
app.use(express.json());


require('./middlewares/auth')(app);
require('./routes/api_v1')(app);


// serve front-end web app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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
