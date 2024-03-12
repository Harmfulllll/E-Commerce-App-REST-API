/*
 * Title: index.js
 * Description : Main file
 * Author: Tanvir Hassan Joy
 * Date: 2024-03-08 21:24:05
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

app.use(bodyParser.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successfull"))
  .catch((err) => {
    console.log(err);
  });

/* Routing */
app.use("/api/users", userRoute);
app.use("/api", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {});
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
