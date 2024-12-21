import Product from "../models/product.js";
import mongoose from "mongoose";
export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Enter all details" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: newProduct });
    } catch (error) {
        console.error("Error when creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(201).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "No products found" });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(404).json({ success: false, message: "No products found" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" });
    }
}