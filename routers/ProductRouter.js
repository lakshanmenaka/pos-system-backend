const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const middleware = require('../middleware/authMiddleware');

router.post('/create', middleware, ProductController.createProduct);
router.put('/update/:id', middleware, ProductController.updateProduct);
router.delete('/delete/:id', middleware, ProductController.deleteProduct);
router.get('/find-by-id/:id', middleware, ProductController.findProductById);
router.get('/load-all', middleware, ProductController.loadAllProducts);

module.exports = router;