const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../src/db");

const router = express.Router();

// Fetch all items
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

// Fetch items by name
router.get("/items/menu", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return req.status(400).json({ error: "name is required." });
  }
  try {
    const items = await db("items")
      .select(
        "item_id",
        "item_name",
        "item_category",
        "item_size",
        "item_price"
      )
      .where("items.item_name", "ilike", `%${name}%`)
      .orderBy([
        { column: "item_name", order: "asc" },
        {
          column: db.raw(
            `CASE
            WHEN LOWER(item_size) = 'large' THEN 1
            WHEN LOWER(item_size) = 'medium' THEN 2
            WHEN LOWER(item_size) = 'small' THEN 3
            ELSE 4
          END`
          ),
          order: "asc",
        },
        { column: "item_category", order: "asc" },
      ]);

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found." });
    }

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch items by category
router.get("/items/category", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return req.status(400).json({ error: "name is required." });
  }
  try {
    const items = await db("items")
      .select(
        "item_id",
        "item_name",
        "item_category",
        "item_size",
        "item_price"
      )
      .where("items.item_category", "ilike", `%${name}%`)
      .orderBy([
        { column: "item_category", order: "asc" },
        { column: "item_name", order: "asc" },
        {
          column: db.raw(
            `CASE
            WHEN LOWER(item_size) = 'large' THEN 1
            WHEN LOWER(item_size) = 'medium' THEN 2
            WHEN LOWER(item_size) = 'small' THEN 3
            ELSE 4
          END`
          ),
          order: "asc",
        },
      ]);

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found." });
    }

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create new item
router.post("/", async (req, res) => {
  const { item_name, item_category, item_size, item_price } = req.body;

  try {
    if (!item_name || !item_category || !item_size || !item_price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const item_id = uuidv4();

    const newItem = {
      item_id,
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
