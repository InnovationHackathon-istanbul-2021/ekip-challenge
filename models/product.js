const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name: {
        type: String
    },
    
    price: {
        type: Number,
        required: true
    },

    productImage: {
        type: String
    },
});

module.exports = mongoose.model("products", Product);