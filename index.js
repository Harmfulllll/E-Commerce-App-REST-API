const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successfull"))
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
