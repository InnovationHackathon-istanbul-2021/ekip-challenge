const express = require("express");
const router = express.Router();

const { checkAuth } = require('../middleware/auth');

const userController = require("../controllers/user");

router.get("/", checkAuth, userController.getUsers);
router.get("/signup", userController.signUpUser);
router.get("/signin", userController.signInUser);
router.get("/myprofile", checkAuth, userController.getProfile);
router.get("/customers", checkAuth, userController.getCustomers);


module.exports = router;
