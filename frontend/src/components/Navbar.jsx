import React, { useState } from 'react';
import logo from '../assets/Images/Logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, onLogout }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Clear search input
      setSearchActive(false); // Hide search bar after submit
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setSearchActive(false), 200); // Delay blur to prevent immediate hiding
  };

  return (
    <div className='bg-emerald-950 text-xl w-screen flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-between p-4 sticky top-0 z-50'>
      <NavLink to='/' className="flex-shrink-0">
        <div className='h-32 w-32 brightness-200'>
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </div>
      </NavLink>

      <div className='flex justify-center flex-grow'>
        <ul className='flex gap-8 md:gap-14 justify-center text-lg text-slate-300 font-poppins'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p className="hover:text-white transition duration-200">Home</p>
          </NavLink>
          <NavLink to='/Product' className='flex flex-col items-center gap-1'>
            <p className="hover:text-white transition duration-200">Product</p>
          </NavLink>
          <NavLink to='/About' className='flex flex-col items-center gap-1'>
            <p className="hover:text-white transition duration-200">About</p>
          </NavLink>
          <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
            <p className="hover:text-white transition duration-200">Contact</p>
          </NavLink>
        </ul>
      </div>

      <div className='flex items-center gap-4 text-black'>
        <form onSubmit={handleSearchSubmit}>
          <div
            className={`flex justify-center items-center rounded-xl h-10 p-2 transition-all duration-300 ease-in-out ${
              searchActive ? 'w-40' : 'w-10'
            } bg-white text-gray-900 shadow-md hover:shadow-lg relative`}
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`text-gray-500 transition-all duration-300 ease-in-out ${searchActive ? 'mr-2' : ''}`}
              style={{ fontSize: '1.25rem' }} // Increase icon size
            />
            {searchActive && (
              <input
                type="text"
                placeholder="Search..."
                className='w-full bg-transparent border-none outline-none placeholder-gray-400 focus:placeholder-gray-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={handleInputBlur} // Delayed blur
                autoFocus
              />
            )}
          </div>
        </form>

        <NavLink to='/cart' className='flex items-center'>
          <FontAwesomeIcon icon={faShoppingCart} className='text-slate-300 hover:text-white transition duration-200' size="lg" />
        </NavLink>

        {user ? (
          <button onClick={onLogout} className='flex items-center' aria-label="Logout">
            <FontAwesomeIcon icon={faSignOutAlt} className='text-slate-300 hover:text-white transition duration-200' size="lg" />
          </button>
        ) : (
          <NavLink to='/Login' className='flex items-center' aria-label="Login">
            <FontAwesomeIcon icon={faUser} className='text-slate-300 hover:text-white transition duration-200' size="lg" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
