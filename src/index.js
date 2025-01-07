const express = require("express");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Endpoint to fetch all orders with detailed information,
// including item details, customer info, and address.
app.get("/orders", async (req, res) => {
  try {
    const orders = await db("orders")
      .join("items", "orders.item_id", "items.item_id")
      .join("customers", "orders.cust_id", "customers.cust_id")
      .join("addresses", "orders.addr_id", "addresses.addr_id")
      .select(
        "orders.order_id",
        "orders.created_at",
        "orders.quantity",
        "orders.delivery",
        "items.item_name",
        "items.item_category",
        "items.item_size",
        "items.item_price",
        "customers.firstname",
        "customers.lastname",
        "addresses.addr_1",
        "addresses.addr_2",
        "addresses.city",
        "addresses.zipcode"
      );

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to fetch a single order's detailed information based on the order ID,
// including item details, customer info, and address.
app.get("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await db("orders")
      .join("items", "orders.item_id", "items.item_id")
      .join("customers", "orders.cust_id", "customers.cust_id")
      .join("addresses", "orders.addr_id", "addresses.addr_id")
      .select(
        "orders.order_id",
        "orders.created_at",
        "orders.quantity",
        "orders.delivery",
        "items.item_name",
        "items.item_category",
        "items.item_size",
        "items.item_price",
        "customers.firstname",
        "customers.lastname",
        "addresses.addr_1",
        "addresses.addr_2",
        "addresses.city",
        "addresses.zipcode"
      )
      .where("orders.order_id", orderId);

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//
app.post("/orders", async (req, res) => {
  const { order_id, item_id, quantity, cust_id, delivery, addr_id } = req.body;

  try {
    if (!order_id || !item_id || !quantity || !cust_id || !addr_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const row_id = uuidv4();

    const created_at = new Date();

    await db("orders").insert({
      row_id,
      order_id,
      created_at,
      item_id,
      quantity,
      cust_id,
      delivery,
      addr_id,
    });

    res.status(201).json({ message: "Order added successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
