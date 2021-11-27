const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.get("/signup", userController.signupUser);


module.exports = router;
