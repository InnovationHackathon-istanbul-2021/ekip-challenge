const userModel = require("../models/user");

const getUsers = async (request, response) => {
    const users = await userModel.find({});
    
    if (users.length > 0) {
        response.status(200).json(users);
    } else {
        response.status(404).json('no users found');
    }
};


module.exports = {
    getUsers
};
