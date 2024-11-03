// src/components/ProductsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductsList = ({ products }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate(`/order/${product._id}`, { state: { product } });
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ height: '420px' }} // Fixed height for consistency
              >
                <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <p className="text-lg text-gray-900 font-bold mt-2">₹{product.price.toFixed(2)}</p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded-lg text-xs px-4 py-2 transition duration-300 ease-in-out"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 font-medium rounded-lg text-xs px-4 py-2 transition duration-300 ease-in-out"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
