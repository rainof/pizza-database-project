const express = require("express");
const ordersRouter = require("../routes/orders");
const itemsRouter = require("../routes/items");
const customersRouter = require("../routes/customers");

const app = express();
app.use(express.json());
app.use("/orders", ordersRouter);
app.use("/items", itemsRouter);
app.use("/customers", customersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
