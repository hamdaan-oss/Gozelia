import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Order = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [product, setProduct] = useState(null);
  const [cod, setCod] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to load product details');

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleApplyCoupon = async () => {
    if (coupon.trim() === '') {
      setErrorMessage('Please enter a coupon code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: coupon, productId: id, productName: product?.name }),
      });

      if (response.ok) {
        const { discountAmount: couponDiscount, applicableProducts } = await response.json();

        // Check if applicableProducts is empty (all products) or contains the current product name
        const isApplicable = 
          applicableProducts.length === 0 || 
          applicableProducts.some((item) => item.productName === product?.name || item.productName === 'All Products');

        if (isApplicable) {
          setDiscountAmount(couponDiscount);
          setSuccessMessage(`Coupon applied successfully! You saved ₹${couponDiscount}.`);
          setErrorMessage(null); 
        } else {
          setErrorMessage('This coupon is not applicable to the selected product.');
          setSuccessMessage(null); 
        }
      } else {
        const { message } = await response.json();
        setErrorMessage(message);
        setSuccessMessage(null); 
      }
    } catch (error) {
      setErrorMessage('Error validating coupon. Please try again.');
      setSuccessMessage(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = Math.max(0, (product?.price || 0) - discountAmount);
    const orderDetails = {
      name,
      number,
      address,
      pincode,
      state,
      email,
      productId: id,
      productName: product?.name,
      productImage: product?.image,
      totalAmount,
      cod,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        setSuccessMessage('Order confirmed! You will receive updates via email.');
        setErrorMessage(null); 
        navigate('/'); 
      } else {
        throw new Error('Failed to place order. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null); 
    }
  };

  if (loading) {
    return <div className="text-center">Loading product details...</div>;
  }

  return (
    <div className="container text-black mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Order Details</h1>
      
      {product ? (
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-4 mb-6">
          <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-full object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mt-4">Price: ₹{product.price.toFixed(2)}</p>
            <p className="text-lg font-bold text-green-600 mt-4">
              Total after Discount: ₹{(product.price - discountAmount).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading product details...</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium text-gray-900">Number</label>
          <input
            id="number"
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            pattern="[0-9]{10}"
            title="Please enter a valid 10 digit number"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            id="pincode"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            pattern="[0-9]{6}"
            title="Please enter a valid 6 digit pincode"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <div className="flex">
            <input
              id="coupon"
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 p-2 flex-1 rounded-l focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
            >
              Apply
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
        </div>

        <div className="flex items-center mb-6">
          <input
            id="cod"
            type="checkbox"
            checked={cod}
            onChange={() => setCod(!cod)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="cod" className="ml-2 text-sm font-medium text-gray-700">Cash on Delivery (COD)</label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Order;
