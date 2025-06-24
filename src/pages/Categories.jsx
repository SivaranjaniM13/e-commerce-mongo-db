import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleBackToHome = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const filteredProducts = selectedCategory?.products.filter((product) => {
    const matchesSearch = (product.name || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f1123] to-pink-100 p-6 text-white">
      {!selectedCategory ? (
        <>
          {/* Back & Title */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleBackToHome}
              className="bg-pink-400 text-[#1a1c2c] font-semibold px-4 py-2 rounded hover:bg-pink-300 transition"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-center w-full -ml-12 sm:-ml-0 text-pink-200">
              Categories
            </h1>
          </div>

          {/* Categories List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Back to Categories */}
          <div className="mb-4">
            <button
              onClick={handleBackToCategories}
              className="bg-pink-400 text-[#1a1c2c] font-semibold px-4 py-2 rounded hover:bg-pink-300 transition"
            >
              ← Back to Categories
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 border border-gray-300 rounded w-full sm:w-1/3 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="p-2 border border-gray-300 rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-pink-200">No products found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
