// src/components/ProductCard.jsx

import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-md mb-2" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">Price: ₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-500 transition duration-200 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
