const ProductSchema = require('../models/ProductSchema');

const createProduct = async (req, resp) => {
    try {
        const { description, unitPrice, qtyOnHand } = req.body;
        const createdProduct = new ProductSchema({
            description, unitPrice, qtyOnHand
        });
        await createdProduct.save();
        return resp.status(201).json({ message: 'Product Saved...' });
    } catch (e) {
        return resp.status(500).json({ message: 'Create Product Error', error: e.message });
    }
};

const updateProduct = async (req, resp) => {
    try {
        const { description, unitPrice, qtyOnHand } = req.body;

        const updatedData = await ProductSchema.findByIdAndUpdate(
            { _id: req.params.id },
            { description, unitPrice, qtyOnHand },
            { new: true }
        );

        if (!updatedData) return resp.status(404).json({ message: 'Product Not Found' });
        return resp.status(200).json({ message: 'Product Updated...', data: updatedData });

    } catch (e) {
        return resp.status(500).json({ message: 'Update Product Error', error: e.message });
    }
};

const deleteProduct = async (req, resp) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductSchema.findByIdAndDelete(id);

        if (!deletedProduct) {
            return resp.status(404).json({ message: 'Product Not Found' });
        }

        return resp.status(200).json({ message: 'Product Deleted Successfully' });
    } catch (e) {
        return resp.status(500).json({ message: 'Delete Product Error', error: e.message });
    }
};

const findProductById = async (req, resp) => {
    try {
        const { id } = req.params;
        const product = await ProductSchema.findById(id);

        if (!product) {
            return resp.status(404).json({ message: 'Product Not Found' });
        }

        return resp.status(200).json({ data: product });
    } catch (e) {
        return resp.status(500).json({ message: 'Find Product Error', error: e.message });
    }
};

const loadAllProducts = async (req, resp) => {
    try {
        const products = await ProductSchema.find();
        return resp.status(200).json({ data: products });
    } catch (e) {
        return resp.status(500).json({ message: 'Load Products Error', error: e.message });
    }
};

module.exports = { createProduct, updateProduct, deleteProduct, findProductById, loadAllProducts };