const mongoose = require('mongoose');


const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('planet', planetSchema);
