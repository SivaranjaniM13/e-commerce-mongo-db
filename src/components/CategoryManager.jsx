import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManager = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!token) return alert('You must be logged in');

    try {
      await axios.post(
        'http://localhost:5000/api/categories',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName('');
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Error adding category');
    }
  };

  return (
    <div className="bg-pink-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#1a1c2c]">Manage Categories</h2>

      {token ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <input
            className="border border-gray-300 p-2 rounded mb-3 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="text"
            placeholder="New Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded transition"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      ) : (
        <p className="text-red-600">Login to manage categories.</p>
      )}

      {/* Category List */}
      <ul className="mt-6 space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="bg-white p-2 rounded shadow text-[#1a1c2c] font-medium"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
