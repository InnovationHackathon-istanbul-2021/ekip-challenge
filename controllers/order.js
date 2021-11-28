const orderModel = require("../models/order");
const userModel = require("../models/user");
const productModel = require("../models/product");
const { checkAuth } = require('../middleware/auth');


const getOrders = async (request, response) => {
    const orders = await orderModel.find({});

    if (orders.length > 0) {
        response.status(200).json(orders);
    } else {
        response.status(404).json('no orders found');
    }
};

// add items to this user cart
// const addToCart = async (request, response) => {
//     const { customerID, itemID, quantity } = request.body;

//     const thisCustomer = await userModel.findOne({ _id: customerID });

//     const thisItem = await itemModel.findOne({ _id: itemID });

//     if (thisCustomer) {
//         if (thisItem) {
//             const newCart = {
//                 customerID,
//                 itemID,
//                 quantity
//             };

//             if (thisItem.availableCount >= quantity) {
//                 thisCustomer.cart.push(newCart);
//                 thisCustomer.save();
//                 response.status(200).json(thisCustomer);
//             } else {
//                 response.status(422).json(`this item does not have ${quantity} quantity in stock`);
//             }
//         } else {
//             response.status(404).json('item not found');
//         }
//     } else {
//         response.status(404).json('user not found');
//     }
// };

// place order with this user cart items
const placeOrder = async (req, res) => {
    const { userRef, items } = req.body;

    const thisCustomer = await userModel.findOne({ _id: userRef });

    if (thisCustomer) {

        const thisProduct = await productModel.findOne({ _id: items[0].productRef });

        if (!thisProduct) return res.json('product not found');

        const totalPrice = await getTotalPrice({
            itemID: items[0].productRef,
            quantity: items[0].quantity,
        });

        const newOrder = new orderModel({
            userRef: thisCustomer._id,
            items,
            totalPrice,
        });
        await newOrder.save();
        thisCustomer.orders.push(newOrder._id);
        await thisCustomer.save();
        res.json(newOrder);

    } else {
        res.status(404).json('user not found');
    }
};

const getTotalPrice = (cartObject) => {
    return productModel.findOne({ _id: cartObject.itemID }).then((resp) => {
        return resp.price * cartObject.quantity;
    });
};


module.exports = {
    getOrders,
    // addToCart,
    placeOrder
};
