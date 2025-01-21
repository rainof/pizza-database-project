const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../src/db");

const router = express.Router();
const SECRET_KEY = "your_secret_key";

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

// Register a new customer
router.post("/register", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    addr_1,
    addr_2,
    city,
    zipcode,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !addr_1 ||
    !city ||
    !zipcode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await db("customers").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cust_id = uuidv4();
    const addr_id = uuidv4();

    const newCustomer = {
      cust_id,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      addr_id,
    };

    const newAddress = {
      addr_id,
      addr_1,
      addr_2: addr_2 || null,
      city,
      zipcode,
    };

    await db.transaction(async (trx) => {
      await trx("addresses").insert(newAddress);
      await trx("customers").insert(newCustomer);
    });

    const token = jwt.sign({ id: cust_id, email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      customer: newCustomer,
      address: newAddress,
    });
  } catch (error) {
    console.error("Error registering user:", error);
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
