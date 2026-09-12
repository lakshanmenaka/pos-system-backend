const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');
const middleware = require('../middleware/authMiddleware');

router.post('/create', middleware, OrderController.createOrder);
router.put('/update/:id', middleware, OrderController.updateOrder);
router.delete('/delete/:id', middleware, OrderController.deleteOrder);
router.get('/find-by-id/:id', middleware, OrderController.findOrderById);
router.get('/load-all', middleware, OrderController.loadAllOrders);

module.exports = router;