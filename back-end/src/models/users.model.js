const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
    },
    salt: {
        type: String,
    }
})


module.exports = mongoose.model('user', userSchema);
