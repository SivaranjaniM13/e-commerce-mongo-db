import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import rightImg from '../assets/logo.png';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(res.data.username);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUsername('Guest');
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0f1123] text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <h1 className="text-2xl font-bold text-pink-300">SHOP SMART</h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:text-pink-200">About</Link>
          <Link to="/categories" className="hover:text-pink-200">Categories</Link>
          <Link to="/admin/products" className="hover:text-pink-200">Manage Products</Link>
          <button onClick={handleLogout} className="bg-pink-400 text-[#1a1c2c] font-semibold px-4 py-2 rounded hover:bg-pink-300 transition">
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-[90vh] bg-gradient-to-r from-[#0f1123] to-pink-100 text-white">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">
            Welcome {username ? username : '...'} !!
          </h1>
          <p className="text-pink-100 mb-6 max-w-md">
            Enjoy a seamless shopping experience – explore our latest deals, trending items, and exclusive offers.
          </p>
          <Link to="/categories" className="bg-pink-400 text-[#1a1c2c] font-bold px-6 py-3 rounded shadow hover:bg-pink-300 transition">
            Start Shopping
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
          <img
            src={rightImg}
            alt="User dashboard"
            className="w-[80%] rounded-full border-4 border-pink-300 shadow-xl"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
