require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const rfs = require('rotating-file-stream');


const app = express();


// MARK: --- Common Middlewares ---
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan(
    ':remote-addr - [:date] ":method :url" :status :res[content-length] :total-time[0] ms ":user-agent"',
    { 
        stream: rfs.createStream("access.log", {
            size: "10M", // rotate every 10 MegaBytes written
            interval: "1d", // rotate daily
            path: path.join(__dirname, '..', 'log'),
        }) 
    }
));
app.use(express.json());


// MARK: --- Custom Middleware and Route ---
require('./middlewares/auth')(app);
require('./routes/api_v1')(app);


// MARK: --- Serve Front-End Web App ---
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = app;
