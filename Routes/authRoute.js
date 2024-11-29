const express = require('express');
// const {RegisterController, LoginController} = require('../Controllers/auth-controller');
// const homeController = require('../Controllers/home-conroller');
const { RegisterController, LoginController } = require('../Controllers/authController');

const router = express.Router();



// router.route("/").get(homeController);
router.route("/register").post(RegisterController)
router.route("/login").post(LoginController)

module.exports = router;