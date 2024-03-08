const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: { type: String, default: "On progress" },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
