const express = require("express");
const cors = require("cors");
const ordersRouter = require("../routes/orders");
const itemsRouter = require("../routes/items");
const customersRouter = require("../routes/customers");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/orders", ordersRouter);
app.use("/items", itemsRouter);
app.use("/customers", customersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
