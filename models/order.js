const mongoose = require("mongoose");

const Item = new mongoose.Schema({
    productRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Order = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    items: {
        type: [Item],
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending'
    }
});


module.exports = mongoose.model("orders", Order);
