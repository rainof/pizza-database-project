const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../src/db");

const router = express.Router();

// Fetch all customers
router.get("/", async (req, res) => {
  try {
    const customers = await db("customers")
      .select("cust_id", "firstname", "lastname")
      .orderBy([
        { column: "firstname", order: "asc" },
        { column: "lastname", order: "asc" },
      ]);

    res.status(200).json(customers);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
