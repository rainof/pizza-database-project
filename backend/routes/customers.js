const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../src/db");

const router = express.Router();

// Fetch all customers
router.get("/", async (req, res) => {
  try {
    const customers = await db("customers")
      .join("addresses", "customers.addr_id", "addresses.addr_id")
      .select(
        "customers.cust_id",
        "customers.firstname",
        "customers.lastname",
        "customers.email",
        "addresses.addr_id",
        "addresses.addr_1",
        "addresses.addr_2",
        "addresses.city",
        "addresses.zipcode"
      )
      .orderBy([
        { column: "firstname", order: "asc" },
        { column: "lastname", order: "asc" },
      ]);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new customer with their address
router.post("/", async (req, res) => {
  const { firstname, lastname, addr_1, addr_2, city, zipcode } = req.body;

  try {
    if (!firstname || !lastname || !addr_1 || !addr_2 || !city || !zipcode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const cust_id = uuidv4();
    const addr_id = uuidv4();

    const newCustomer = {
      cust_id,
      firstname,
      lastname,
    };

    const newAddress = {
      addr_id,
      addr_1,
      addr_2: addr_2 || null,
      city,
      zipcode,
    };

    await db.transaction(async (trx) => {
      await db("customers").insert(newCustomer);
      await db("addresses").insert(newAddress);
    });

    res.status(201).json({
      message: "Customer created successfully.",
      customer: newCustomer,
      address: newAddress,
    });
  } catch (error) {
    console.error("Error creating customer and address:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a customer by ID
router.delete("/:custId", async (req, res) => {
  const { custId } = req.params;

  try {
    const existingCust = await db("customers").where("cust_id", custId).first();

    if (!existingCust) {
      return res.status(404).json({ error: "Customer not found." });
    }

    await db("customers").where("cust_id", custId).del();

    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
