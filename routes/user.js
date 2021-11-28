const express = require("express");
const router = express.Router();

const { checkAuth } = require('../middleware/auth');

const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.get("/signup", userController.signupUser);
router.get("/signin", userController.signInUser);
//router.get("/profile", userController.userProfile);
router.get("/orders", userController.getAdminProfile);

module.exports = router;
