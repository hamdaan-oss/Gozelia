// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {
    // Fetch products from the API (mocked for now)
    const fetchProducts = async () => {
      const response = await fetch('/api/products'); // Adjust this URL based on your backend setup
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (newProduct) {
      // Add product logic here (mocked)
      const updatedProducts = [...products, { name: newProduct }];
      setProducts(updatedProducts);
      setNewProduct('');
    }
  };

  const handleDeleteProduct = (productName) => {
    const updatedProducts = products.filter((product) => product.name !== productName);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="New Product Name"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button onClick={handleAddProduct} className="bg-emerald-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <ul>
        {products.map((product, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{product.name}</span>
            <button
              onClick={() => handleDeleteProduct(product.name)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
