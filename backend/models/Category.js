const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [ProductSchema]
});

module.exports = mongoose.model('Category', CategorySchema);
