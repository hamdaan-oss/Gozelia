// src/components/AddProductForm.jsx
import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: parseFloat(price), category, image };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const product = await response.json();
      onAddProduct(product); // Call the parent function to update the product list
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full mb-2 border rounded p-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full mb-2 border rounded p-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full mb-2 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
