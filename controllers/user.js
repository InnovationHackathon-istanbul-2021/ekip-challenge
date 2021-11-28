const userModel = require("../models/user");

const signupUser = async (req, res) => {
    res.render("auth/signup");
};

const signInUser = async(req, res) => {
    res.render("auth/signin");
};

const userProfile = async(req, res) => {
    res.render("auth/profile1");
};

const getUsers = async (request, response) => {
    const users = await userModel.find({});

    if (users.length > 0) {
        //response.status(200).json(users);
        console.log(users[0]);
        response.render("dashboard/users", { users: users });
    } else {
        response.status(404).json('no users found');
    }
};


module.exports = {
    getUsers,
    signupUser,
    signInUser,
    userProfile
};
