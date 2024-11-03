// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Assuming you have CartContext for managing cart

const CategoryProducts = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Add to Cart functionality
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?category=${category}`);
        console.log('Fetched Products:', response.data); // Log the fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleBuyNow = (product) => {
    navigate(`/order/${product._id}`, { state: { product } });
  };

  if (loading) return <div className="text-center text-gray-300">Loading...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8 capitalize">{category} Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ height: '400px' }} // Fixed height
              >
                <div className="w-full h-48 flex items-center justify-center bg-gray-100">
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
            <div className="text-center text-gray-600">No products found for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
