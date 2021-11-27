mongoose = require("mongoose");
Product = require("../models/product.js");

const addProduct = (req, res) => {
    const { name, price, productImage } = req.body;

    const newProduct = new Product({
        "name": name,
        "price": price,
        "productImage": productImage
    });

    await Product.save(function (err, post) {
        if (err) { res.status(422).json(error); }
        res.status(200).json(newProduct);
    });
};

const updateProduct = (req, res) => {
    const { name, price, productImage } = req.body;

    const product = await Product.findOne({ "name": req.params.name });

    if (product) {
        await Product.updateOne({ "name": req.params.name }, { $set: { "name": name, "price": price, "productImage": productImage } }, { new: true });
        res.status(200).json(product);
    } else {
        res.status(422).json("Product not found");
    }
};

module.exports = {
    addProduct,
    updateProduct
};
