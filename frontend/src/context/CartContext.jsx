// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id); // Check by unique ID
    if (existingItem) {
      // If the product already exists, increment its quantity
      setCartItems(cartItems.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If it's a new product, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to update the quantity of a product
  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);
