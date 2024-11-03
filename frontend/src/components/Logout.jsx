import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded">
      Logout
    </button>
  );
};

export default Logout;
