const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String },
    price: { type: Number, required: true },
    color: { type: String },
    category: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", modelSchema);
