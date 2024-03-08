const express = require("express");
const app = express.json();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("user");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successfull"))
  .catch((err) => {
    console.log(err);
  });
app.use("/api/users", userRoute);

app.get("/", (req, res) => {});
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
