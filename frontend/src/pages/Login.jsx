import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = (email, password) => {
    console.log('Logging in with:', email, password);
    
    // Simulate login logic here. Replace with actual logic.
    const userData = { email }; // Simulated user data

    // Call onLogin to set user data
    onLogin(userData); 
    
    navigate('/'); // Redirect to home after login
  };

  const handleRegister = (email, password) => {
    console.log('Signing up with:', email, password);
    // Add registration logic here
  };

  return (
    <div className="flex items-center justify-center text-black mt-10 m-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:w-[60vw] md:h-[50vh] transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-emerald-950 mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-medium hover:underline ml-1"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
