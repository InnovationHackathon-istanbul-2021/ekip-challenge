const productModel = require("../models/product.js");

const getProducts = async (req, res) => {
    const products = await productModel.find({});

    if (products.length > 0) {
        res.status(200).render('dashboard/products', { products, products });
    } else {
        res.status(404).json('no users found');
    }
};

const addProduct = async (req, res) => {
    const { name, price, image, description, isAvailable, category } = req.body;

    const newProduct = new productModel({
        name: name,
        price: price,
        image: image,
        description: description,
        isAvailable: isAvailable,
        category: category
    });

    await newProduct.save(function (err, product) {
        if (err) { res.status(422).json(err); }
        res.status(200).json(product);
    });
};

const updateProduct = async (req, res) => {
    const thisProductName = req.params.name;

    const { name, price, image, description, isAvailable, category } = req.body;

    const product = await productModel.findOne({ name: thisProductName });

    if (product) {
        await productModel.updateOne({ name: thisProductName }, {
            $set: {
                name: name,
                price: price,
                image: image,
                description: description,
                isAvailable: isAvailable,
                category: category
            }
        }, { new: true });

        res.status(200).json(product);
    } else {
        res.status(422).json("Product not found");
    }
};

const deleteProduct = async (req, res) => {
    const productID = req.params.id;

    const thisProduct = await productModel.findById(productID);

    if (thisProduct) {
        thisProduct.remove();
        res.status(200).json('product deleted successfully');
    } else {
        res.status(404).json('product not found');
    }
};

const filterProducts = async (req, res) => {

    const { category, leftRange, rightRange } = req.params;

    const products = await productModel.find({
        $and: [
            {
                price: { $gte: leftRange, $lte: rightRange }
            },
            { category: category }
        ]
    });

    if (products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(404).json('no products found based on this filtering');
    }

};

// const filterProducts = async (req, res) => {
//     const { pricemin, pricemax, category } = req.query;
//     try {
//         if (!pricemax && !pricemin && !category) res.status(400).json('invalid query parameter');
//         if (pricemin && pricemax && !category) {
//             const priceFilter = await productModel.find({ price: { $gte: pricemin, $lte: pricemax } });
//             res.status(200).send(priceFilter);
//         } else if (!pricemin && !pricemax && category) {
//             const categoryFilter = await productModel.find({ category: { $in: category } });
//             res.status(200).send(categoryFilter);
//         } else if (pricemin && pricemax && category) {
//             const productFilter = await productModel.find({ $and: [{ price: { $gte: pricemin, $lte: pricemax } }, { category: category }] });
//             res.status(200).send(productFilter);
//         }
//     } catch (error) {
//         return res.status(422).send({ message: "Couldn't find", error });
//     }
// };

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts
};
