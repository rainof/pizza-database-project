const express = require("express");
const db = require("../src/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await db("items").select(
      "item_id",
      "item_name",
      "item_category",
      "item_size",
      "item_price"
    );

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { item_name, item_category, item_size, item_price } = req.body;

  try {
    if (!item_name || !item_category || !item_size || !item_price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newItem = {
      item_id: require("uuid").v4(),
      item_name,
      item_category,
      item_size,
      item_price,
    };

    await db("items").insert(newItem);

    res
      .status(201)
      .json({ message: "Item created successfully.", item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
