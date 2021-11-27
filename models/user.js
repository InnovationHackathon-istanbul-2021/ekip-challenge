const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    }
});


module.exports = mongoose.model("users", User);
