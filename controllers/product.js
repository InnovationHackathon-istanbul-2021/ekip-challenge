const productModel = require("../models/product.js");

const getProducts = async (request, response) => {
    const products = await productModel.find({});

    if (products.length > 0) {
        response.status(200).json(products);
    } else {
        response.status(404).json('no users found');
    }
};

const addProduct = async (req, res) => {
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

const updateProduct = async (req, res) => {
    const { name, price, productImage } = req.body;

    const product = await Product.findOne({ "name": req.params.name });

    if (product) {
        await Product.updateOne({ "name": req.params.name }, {
            $set: {
                "name": name,
                "price": price,
                "productImage": productImage
            }
        }, { new: true });
        res.status(200).json(product);
    } else {
        res.status(422).json("Product not found");
    }
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct
};
