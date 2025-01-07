const express = require("express");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
