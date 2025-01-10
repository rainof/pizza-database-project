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

module.exports = router;
