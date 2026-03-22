import Product from "../models/productModel.js";
import cloudinary from "../config/cloudnary.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, partNumber, description, price, stock, brand, isActive } = req.body;

    if (!name || !partNumber || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, partNumber aur price required hai"
      });
    }

    // Multiple images Cloudinary se
    const images = req.files?.images
      ? req.files.images.map(file => file.path)
      : [];

    const product = await Product.create({
      name, partNumber, description, price,
      stock, brand, images, isActive
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Naye images upload ho rahe hain toh add karo
    if (req.files?.images) {
      updates.images = req.files.images.map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE PRODUCT (soft delete)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// PERMANENT DELETE PRODUCT
export const permanentDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product permanently deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};