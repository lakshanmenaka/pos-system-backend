const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    date: { type: String, required: true },
    totalCost: { type: Number, required: true },
    products: { type: Array, required: true },
    customer: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model('order', OrderSchema);