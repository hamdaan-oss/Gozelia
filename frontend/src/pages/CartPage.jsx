// src/components/CartPage.jsx

import React from 'react';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Navigate to the order page with cart items as state
    navigate('/order', { state: { cartItems, total: calculateTotal() } });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-emerald-900">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center border-b pb-4">
                  <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-emerald-800">{item.name}</h2>
                    <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="bg-emerald-600 text-white px-2 rounded-md hover:bg-emerald-500 transition duration-200 ease-in-out">+</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => item.quantity > 1 ? updateQuantity(item._id, item.quantity - 1) : removeFromCart(item._id)} 
                        className="bg-red-600 text-white px-2 rounded-md hover:bg-red-500 transition duration-200 ease-in-out">-</button>
                      <button onClick={() => removeFromCart(item._id)} className="ml-4 text-red-500 hover:text-red-600 transition duration-200 ease-in-out">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-emerald-800">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <div>
                <h2 className="text-lg font-semibold text-emerald-800">Total:</h2>
                <p className="text-xl font-bold text-emerald-900">₹{calculateTotal()}</p>
              </div>
              <div className="space-x-4">
                <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200 ease-in-out">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-500 transition duration-200 ease-in-out">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
