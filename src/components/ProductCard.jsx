import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[300px] h-[300px] overflow-hidden text-black flex flex-col">
      {/* Large Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[65%] object-contain p-2"
      />

      {/* Text content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-bold truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
        <p className="text-purple-700 font-semibold">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
