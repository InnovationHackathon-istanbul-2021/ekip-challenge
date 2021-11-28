const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        default: 'customer',
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String
    },
    orders: {
        type: Array,
        default: []
    },
    providerID: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("users", User);
