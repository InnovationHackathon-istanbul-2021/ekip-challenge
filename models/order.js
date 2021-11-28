const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    productRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});


module.exports = mongoose.model("orders", Order);
