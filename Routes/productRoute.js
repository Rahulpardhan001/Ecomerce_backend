const app = require('express');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../Controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');
const productRoute = app.Router();

productRoute.route('/createproduct').post(authMiddleware,createProduct)

productRoute.route('/').get(getAllProducts)

productRoute.route('/product/:id').get(getProductById);
productRoute.route('/product/:id').put(updateProduct);
productRoute.route('/product/:id').delete(deleteProduct);

module.exports = productRoute;