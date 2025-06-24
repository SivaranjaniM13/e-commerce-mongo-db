import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:bg-purple-100 text-left w-full"
    >
      <h2 className="text-xl font-semibold text-purple-700 mb-2">{category.name}</h2>

    </button>
  );
};

export default CategoryCard;
