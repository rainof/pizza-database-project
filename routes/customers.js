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

// Create new customer
router.post("/", async (req, res) => {
  const { firstname, lastname } = req.body;

  try {
    if (!firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const cust_id = uuidv4();

    const newCustomer = {
      cust_id,
      firstname,
      lastname,
    };

    await db("customers").insert(newCustomer);

    res
      .status(201)
      .json({
        message: "Customer created successfully.",
        customer: newCustomer,
      });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
