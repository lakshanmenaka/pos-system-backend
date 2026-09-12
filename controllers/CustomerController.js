const CustomerSchema = require('../models/CustomerSchema');

const createCustomer = async (req, resp) => {
    try {
        const { name, address, salary, contact } = req.body;
        const createdCustomer = new CustomerSchema({
            name, address, salary, contact
        });
        await createdCustomer.save();
        resp.status(201).json({ 'message': 'Customer Saved...' });
    } catch (e) {
        resp.status(500).json({ 'message': 'Signup Error', error: e });
    }
};

const updateCustomer = async (req, resp) => {
    try {
        const { name, address, salary, contact } = req.body;

        const updatedData = await CustomerSchema.findByIdAndUpdate(
            { _id: req.params.id },
            { name: name, address: address, salary: salary, contact: contact },
            { new: true }
        );

        if (!updatedData) return resp.status(500).json({ 'message': 'Try Again' });
        resp.status(200).json({ message: 'Customer Updated...' });

    } catch (e) {
        resp.status(500).json({ 'message': 'Signup Error', error: e });
    }
};

const deleteCustomer = async (req, resp) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await CustomerSchema.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return resp.status(404).json({ message: 'Customer Not Found' });
        }

        return resp.status(200).json({ message: 'Customer Deleted Successfully' });
    } catch (e) {
        return resp.status(500).json({ message: 'Delete Customer Error', error: e.message });
    }
};

const findCustomerById = async (req, resp) => {
    try {
        const { id } = req.params;
        const customer = await CustomerSchema.findById(id);

        if (!customer) {
            return resp.status(404).json({ message: 'Customer Not Found' });
        }

        return resp.status(200).json({ data: customer });
    } catch (e) {
        return resp.status(500).json({ message: 'Find Customer Error', error: e.message });
    }
};

const loadAllCustomers = async (req, resp) => {
    try {
        const customers = await CustomerSchema.find();
        return resp.status(200).json({ data: customers });
    } catch (e) {
        return resp.status(500).json({ message: 'Load Customers Error', error: e.message });
    }
};

module.exports = { createCustomer, updateCustomer, deleteCustomer, findCustomerById, loadAllCustomers };