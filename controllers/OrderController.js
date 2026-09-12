const OrderSchema = require('../models/OrderSchema');

const createOrder = async (req, resp) => {
    try {
        const { date, totalCost, products, customer } = req.body;
        const createdOrder = new OrderSchema({
            date, totalCost, products, customer
        });
        await createdOrder.save();
        return resp.status(201).json({ message: 'Order Placed Successfully...' });
    } catch (e) {
        return resp.status(500).json({ message: 'Create Order Error', error: e.message });
    }
};

const updateOrder = async (req, resp) => {
    try {
        const { date, totalCost, products, customer } = req.body;

        const updatedData = await OrderSchema.findByIdAndUpdate(
            { _id: req.params.id },
            { date, totalCost, products, customer },
            { new: true }
        );

        if (!updatedData) return resp.status(404).json({ message: 'Order Not Found' });
        return resp.status(200).json({ message: 'Order Updated...', data: updatedData });

    } catch (e) {
        return resp.status(500).json({ message: 'Update Order Error', error: e.message });
    }
};

const deleteOrder = async (req, resp) => {
    try {
        const { id } = req.params;
        const deletedOrder = await OrderSchema.findByIdAndDelete(id);

        if (!deletedOrder) {
            return resp.status(404).json({ message: 'Order Not Found' });
        }

        return resp.status(200).json({ message: 'Order Deleted Successfully' });
    } catch (e) {
        return resp.status(500).json({ message: 'Delete Order Error', error: e.message });
    }
};

const findOrderById = async (req, resp) => {
    try {
        const { id } = req.params;
        const order = await OrderSchema.findById(id);

        if (!order) {
            return resp.status(404).json({ message: 'Order Not Found' });
        }

        return resp.status(200).json({ data: order });
    } catch (e) {
        return resp.status(500).json({ message: 'Find Order Error', error: e.message });
    }
};

const loadAllOrders = async (req, resp) => {
    try {
        const orders = await OrderSchema.find();
        return resp.status(200).json({ data: orders });
    } catch (e) {
        return resp.status(500).json({ message: 'Load Orders Error', error: e.message });
    }
};

module.exports = { createOrder, updateOrder, deleteOrder, findOrderById, loadAllOrders };