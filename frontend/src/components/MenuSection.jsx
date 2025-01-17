import React, { useState, useEffect } from 'react';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  // Fetch all items on mount
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  // Handle Search
  const handleSearch = () => {
    fetch(`http://localhost:3000/items/items/menu?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu:", error));
  };

  // Handle Category Filter
  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
    console.log("Selected category:", categoryName);

    const url = categoryName === "All"
      ? "http://localhost:3000/items"
      : `http://localhost:3000/items/items/category?name=${categoryName}`;

    fetch(url)
      .then((response) => {
        console.log("Raw Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  };

  return (
    <section className="p-6 bg-gray-100">
      {/* Search Bar */}
      <div className="flex justify-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-orange-500 text-white rounded-md">
          Search
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Pizza", "Drink", "Side"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-md ${
              category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.item_id} className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold text-gray-800">{item.item_name}</h2>
            <p className="text-gray-500">{item.item_category} - {item.item_size}</p>
            <p className="text-orange-500 font-semibold">${item.item_price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
