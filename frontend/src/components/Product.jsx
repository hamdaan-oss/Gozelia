// src/components/Product.jsx

import React from 'react';

// Utility function to capitalize the first letter of the category
const capitalizeCategory = (category) => {
  if (!category) return '';
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const Product = ({ id, name, description, price, category, image, showBuyButton = true }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover mb-2 transition-opacity duration-200 hover:opacity-80"
      />
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-1">{description}</p>
        <p className="text-lg font-bold text-gray-900">₹{price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mb-2">{capitalizeCategory(category)}</p>
        {showBuyButton && (
          <a
            href={`/order/${id}`}
            className="w-full inline-block text-center bg-blue-600 text-white font-semibold py-1 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Buy Now
          </a>
        )}
      </div>
    </div>
  );
};

export default Product;
