import React from 'react';

const MenuSection = () => {
  const menuItems = [
    { name: 'PIZZA 01', price: '$10' },
    { name: 'PIZZA 02', price: '$12' },
    { name: 'PIZZA 03', price: '$11' },
  ];

  return (
    <section className="py-8 px-4 bg-gray-100">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Our Menu</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-md shadow-md"
          >
            <span className="text-gray-800">{item.name}</span>
            <span className="text-orange-500 font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuSection;
