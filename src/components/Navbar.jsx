import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const isDashboard = location.pathname === '/dashboard';
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-[#1a1c2c] text-white px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Brand Logo / Title */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        SHOP SMART
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/about" className="hover:text-yellow-300 transition duration-200">About</Link>
        <Link to="/categories" className="hover:text-yellow-300 transition duration-200">Categories</Link>
        <Link to="/admin/products" className="hover:text-yellow-300 transition duration-200">Manage Products</Link>

        {username ? (
          isDashboard && (
            <button
              onClick={handleLogout}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
            >
              Logout
            </button>
          )
        ) : (
          location.pathname === '/' && (
            <Link
              to="/signup"
              className="bg-yellow-400 text-[#1a1c2c] px-4 py-2 rounded hover:bg-yellow-500 font-semibold transition duration-200"
            >
              Signup
            </Link>
          )
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-16 right-6 bg-[#1a1c2c] text-white rounded shadow-md p-4 space-y-2 z-50 w-48">
            <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">About</Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">Categories</Link>
            <Link to="/admin/products" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">Manage Products</Link>

            {username ? (
              isDashboard && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="block bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full text-left"
                >
                  Logout
                </button>
              )
            ) : (
              location.pathname === '/' && (
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block bg-yellow-400 text-[#1a1c2c] px-4 py-2 rounded hover:bg-yellow-500 font-semibold"
                >
                  Signup
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
