const express = require('express');
const {addToCart, getCart, removeCart, updateCart} = require('../Controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const cartRoutes = express.Router();

cartRoutes.route('/addToCart').post(authMiddleware, addToCart);
cartRoutes.route('/getcart').get(authMiddleware,getCart)
cartRoutes.route('/removecart').delete(removeCart)
cartRoutes.route('/updatecart').put(updateCart)

module.exports = cartRoutes;