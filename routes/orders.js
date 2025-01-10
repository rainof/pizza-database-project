const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../src/db");

const router = express.Router();

// Fetch all orders with item, customer, and address details
router.get("/", async (req, res) => {
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

// Fetch single order details by ID
router.get("/:orderId", async (req, res) => {
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

// Add a new order
router.post("/", async (req, res) => {
  const { order_id, item_id, quantity, cust_id, delivery, addr_id } = req.body;

  try {
    if (!order_id || !item_id || !quantity || !cust_id || !addr_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const row_id = uuidv4();

    const created_at = new Date();

    const newOrder = {
      row_id,
      order_id,
      created_at,
      item_id,
      quantity,
      cust_id,
      delivery,
      addr_id,
    };

    await db("orders").insert(newOrder);

    res
      .status(201)
      .json({ message: "Order added successfully.", order: newOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update an existing order by ID
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { quantity, delivery, addr_id } = req.body;

  try {
    const existingOrder = await db("orders").where("order_id", orderId).first();
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    const updates = {};
    if (quantity != undefined) updates.quantity = quantity;
    if (delivery != undefined) updates.delivery = delivery;
    if (addr_id != undefined) updates.addr_id = addr_id;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update." });
    }

    await db("orders").where("order_id", orderId).update(updates);

    res.status(200).json({ message: "Order updated successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an order by ID
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const existingOrder = await db("orders").where("order_id", orderId).first();

    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    await db("orders").where("order_id", orderId).del();

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch orders by delivery status
router.get("/delivery/:status", async (req, res) => {
  const { status } = req.params;
  const deliveryStatus = status === "true";

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
      )
      .where("orders.delivery", deliveryStatus);

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: `No orders found with \'${status}\' status` });
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch orders by date time
router.get("/orders/date-range", async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required." });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (start > end) {
      return res
        .status(400)
        .json({ error: "startDate must be before endDate." });
    }

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
      )
      .whereBetween("orders.created_at", [start, end]);

    if (orders.length === 0) {
      return res.status(404).json({
        message: `No orders found in the range between \'${startDate}\' and \'${endDate}\'`,
      });
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
