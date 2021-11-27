const userModel = require("../models/user");

const getUsers = async (request, response) => {
    const orders = await userModel.find({});

    if (orders.length > 0) {
        response.status(200).json(orders);
    } else {
        response.status(404).json('no orders found');
    }
};


module.exports = {
    getUsers
};
