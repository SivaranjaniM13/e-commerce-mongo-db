import React from 'react';
import CategoryManager from '../components/CategoryManager';
import ProductManager from '../components/ProductManager';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1123] to-pink-100 p-6 text-[#1a1c2c]">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-pink-500 text-center">Admin Dashboard</h1>
        
        <div className="mb-8">
          <CategoryManager />
        </div>

        <hr className="border-t border-gray-300 mb-8" />

        <div>
          <ProductManager />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
