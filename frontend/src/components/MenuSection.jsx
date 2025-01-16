import React, { useState, useEffect } from 'react';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched menu data:", data);
        setMenuItems(data);
      })
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  return (
    <section className="py-8 px-4 bg-gray-100">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Our Menu</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={item.item_id}
            className="flex justify-between items-center p-4 bg-white rounded-md shadow-md"
          >
            <span className="text-gray-800">
              {item.item_name} ({item.item_size})
            </span>
            <span className="text-orange-500 font-semibold">${item.item_price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MenuSection;
