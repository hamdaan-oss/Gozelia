import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductsList from '../components/ProductsList';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract search term from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${searchTerm || ''}`);
      if (!response.ok) throw new Error('Failed to fetch products. Please try again later.');

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]); // Refetch products whenever search term changes

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Products</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
};

export default Product;
