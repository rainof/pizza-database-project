import React from 'react';


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-orange-500 text-white">
      <div className="text-2xl font-bold">PizzaLand</div>
      <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
        Login
      </button>
    </nav>
  )
}

export default Navbar;