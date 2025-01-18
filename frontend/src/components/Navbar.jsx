import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-orange-500 text-white">
      <div className="text-2xl font-bold">PizzaLand</div>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
