const orderModel = require("../models/order");

const getOrders = async (request, response) => {
    const orders = await orderModel.find({});

    if (orders.length > 0) {
        response.status(200).render("order/orders", {orders: orders});
    } else {
        response.status(404).json('no orders found');
    }
};

// add items to this user cart
const addToCart = async (request, response) => {
    const { customerID, itemID, quantity } = request.body;

    const thisCustomer = await userModel.findOne({ _id: customerID });

    const thisItem = await itemModel.findOne({ _id: itemID });

    if (thisCustomer) {
        if (thisItem) {
            const newCart = {
                customerID,
                itemID,
                quantity
            };

            if (thisItem.availableCount >= quantity) {
                thisCustomer.cart.push(newCart);
                thisCustomer.save();
                response.status(200).json(thisCustomer);
            } else {
                response.status(422).json(`this item does not have ${quantity} quantity in stock`);
            }
        } else {
            response.status(404).json('item not found');
        }
    } else {
        response.status(404).json('user not found');
    }
};

// place order with this user cart items
const placeOrder = async (request, response) => {
    const { customerID } = request.body;

    const thisCustomer = await userModel.findOne({ _id: customerID });

    if (thisCustomer) {
        if (thisCustomer.cart.length < 1) {
            response.status(404).json('your cart is empty, go shop something NOW!!!');
        } else {
            // TODO cart may have more than one product to order at once, here we may add a loop to get all the cart objects and bundle them as single order
            const newOrder = new orderModel({
                userRef: thisCustomer._id,
                itemRef: thisCustomer.cart[0].itemID,
                totalPrice: await getTotalPrice(thisCustomer.cart[0])
            });

            if (await isAvailableInStock(thisCustomer.cart[0])) {
                newOrder.save();
                await updateStock(thisCustomer.cart[0]);
                thisCustomer.cart = [];
                thisCustomer.orders.push({
                    orderID: newOrder._id,
                    orderTotalPrice: newOrder.totalPrice
                });
                thisCustomer.save();
                response.status(201).json({
                    message: 'Your order has been successfully placed thank you for using our website!',
                    orderDetails: newOrder
                });
            } else {
                thisCustomer.cart = [];
                thisCustomer.save();
                response.status(422).json('item is out of stock');
            }
        }

    } else {
        response.status(404).json('user not found');
    }
};

const getTotalPrice = (cartObject) => {
    return itemModel.findOne({ _id: cartObject.itemID }).then((resp) => {
        return resp.price * cartObject.quantity;
    });
};

const isAvailableInStock = (cartObject) => {
    return itemModel.findOne({ _id: cartObject.itemID }).then((resp) => {
        if (resp.availableCount > 0) {
            return true;
        } else {
            return false;
        }
    });
};

const updateStock = (cartObject) => {
    return itemModel.findOne({ _id: cartObject.itemID }).then((resp) => {
        resp.availableCount -= cartObject.quantity;
        resp.save();
    });
};

module.exports = {
    getOrders,
    // addToCart,
    // placeOrder
};
