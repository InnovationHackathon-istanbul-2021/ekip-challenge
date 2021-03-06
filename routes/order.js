const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/", orderController.getOrders);
router.post("/", orderController.placeOrder);

module.exports = router;
