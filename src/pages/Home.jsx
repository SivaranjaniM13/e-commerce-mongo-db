import React, { useState } from 'react';
import rightImg from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0f1123] text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <h1 className="text-2xl font-bold text-pink-300">SHOP SMART</h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:text-pink-200">About</Link>
          <Link to="/categories" className="hover:text-pink-200">Categories</Link>
          <Link to="/signup" className="bg-pink-400 text-[#1a1c2c] font-semibold px-4 py-2 rounded hover:bg-pink-300 transition">
            Signup
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-16 right-6 bg-[#0f1123] text-white rounded shadow-md p-4 space-y-3 z-50">
              <Link to="/about" className="block hover:text-pink-200" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/categories" className="block hover:text-pink-200" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link to="/signup" className="block bg-pink-400 text-[#1a1c2c] font-semibold px-4 py-2 rounded hover:bg-pink-300 transition" onClick={() => setIsOpen(false)}>Signup</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#0f1123] to-pink-100 min-h-[90vh]">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Welcome to <span className="text-pink-200">Shop Smart</span>!
          </h1>
          <p className="text-pink-100 text-lg max-w-md mb-6">
            One destination for all your needs. Explore a wide range of products and categories with ease.
          </p>
          <Link to="/categories" className="bg-pink-400 text-[#1a1c2c] font-bold px-6 py-3 rounded shadow hover:bg-pink-300 transition">
            Start Shopping
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <img
            src={rightImg}
            alt="Shopping"
            className="w-[80%] rounded-full border-4 border-pink-300 shadow-xl"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
