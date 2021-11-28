const userModel = require("../models/user");
const orderModel = require("../models/order");
const productModel = require("../models/product");

const signUpUser = async (req, res) => {
    res.render("auth/signup");
};

const signInUser = async (req, res) => {
    res.render("auth/signin");
};

const userProfile = async (req, res) => {
    res.render("auth/profile1");
};

const getUsers = async (req, res) => {
    const users = await userModel.find({});

    if (users.length > 0) {
        //response.status(200).json(users);
        res.json(users);
        // response.render("dashboard/users", { users: users });
    } else {
        response.status(404).json('no users found');
    }
};

const getProfile = async (req, res) => {
    const { id } = req.user;

    const currentUser = await userModel.findOne({ _id: id });

    console.log('here in user controller', currentUser);
    if (currentUser) {
        // create an array for each orders and fetch each order 
        const ordersWithProducts = [];

        for (let i = 0; i < currentUser.orders.length; i++) {
            const newOrder = {};
            const order = await orderModel.findOne({ _id: currentUser.orders[i] });
            newOrder.totalPrice = order.totalPrice;
            newOrder.items = [];
            for (let j = 0; j < order.items.length; j++) {
                const product = await productModel.findOne({ _id: order.items[j].productRef });
                newOrder.items.push(product);
            }
            ordersWithProducts.push(newOrder);
        }
        // using this array for each order's item
        res.render('auth/profile', { user: currentUser, recentOrders: ordersWithProducts }); // TODO pass this to render
    } else {
        res.status(404).json('user not found');
    }
};


module.exports = {
    getUsers,
    signUpUser,
    signInUser,
    userProfile,
    getProfile
};
