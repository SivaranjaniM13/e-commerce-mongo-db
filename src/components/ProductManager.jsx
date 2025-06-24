import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to load categories', err);
        setMessage('Error loading categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setMessage('⚠️ Please select a category.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/categories/${selectedCategory}/products`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Product added successfully!');
      setProduct({
        name: '',
        image: '',
        description: '',
        price: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f1123] to-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-500">Add Product</h2>

        {message && <p className="mb-4 text-sm text-center text-gray-700">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700">Select Category</label>
          <select
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-400 text-[#1a1c2c] font-bold p-3 rounded hover:bg-pink-300 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductManager;
