const express = require("express");
const ordersRouter = require("../routes/orders");
const itemsRouter = require("../routes/items");

const app = express();
app.use(express.json());
app.use("/orders", ordersRouter);
app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
