import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-red-600 text-white px-4 py-2 flex justify-between">
    <Link to="/" className="font-bold">BloodConnect</Link>
    <div className="space-x-4">
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
    </div>
  </nav>
);

export default Navbar;
