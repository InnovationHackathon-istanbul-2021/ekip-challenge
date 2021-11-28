const express = require("express");
const router = express.Router();

const { checkAuth } = require('../middleware/auth');

const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.get("/signup", userController.signUpUser);
router.get("/signin", userController.signInUser);
router.get("/myprofile", checkAuth, userController.getProfile);


module.exports = router;
