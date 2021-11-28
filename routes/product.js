const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/", productController.getProducts);
router.get("/:category/:leftRange-:rightRange", productController.filterProducts);
router.post("/", productController.addProduct);
router.put("/:name", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
