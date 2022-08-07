const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
    },
    salt: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
})


module.exports = mongoose.model('user', userSchema);
