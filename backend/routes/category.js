const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const isAuthenticated = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, products } = req.body;
    const category = new Category({ name, products });
    await category.save();
    res.status(201).json({ message: 'Category with products added', category });
  } catch (err) {
    res.status(500).json({ message: 'Error adding category', error: err.message });
  }
});
// Create category (protected)
router.post('/:categoryId/products', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, image, description, price } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newProduct = { name, image, description, price };
    category.products.push(newProduct);
    await category.save();

    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Update category (protected)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category' });
  }
});

// Delete category (protected)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

// Add product to category (protected)
/*router.post('/:id/products',  async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.products.push(req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});*/

// Update product (protected)
router.put('/:categoryId/products/:productId', isAuthenticated, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const product = category.products.id(req.params.productId);
    Object.assign(product, req.body);
    await category.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (protected)
router.delete('/:categoryId/products/:productId', isAuthenticated, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    category.products.id(req.params.productId).remove();
    await category.save();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
