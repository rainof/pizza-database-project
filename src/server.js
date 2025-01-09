const express = require("express");
const ordersRouter = require("../routes/orders");

const app = express();
app.use(express.json());
app.use("/orders", ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
