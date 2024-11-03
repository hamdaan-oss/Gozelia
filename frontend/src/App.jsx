import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Placeorder from './pages/Placeorder';
import Order from './pages/Order';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import ProductsList from './components/ProductsList';
import Logout from './components/Logout';
import ProductAdd from './components/AddProductForm'; 
import CategoryProducts from './pages/CategoryProducts';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Retrieve user data from local storage
  });

  const handleLogin = (userData) => {
    setUser(userData); // Set user data after successful login
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to local storage
  };

  const handleLogout = () => {
    setUser(null); // Clear user data on logout
    localStorage.removeItem('user'); // Remove user data from local storage
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/about" element={<About />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/add" element={<ProductAdd />} /> {/* Add product route */}
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
