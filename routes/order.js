const order = require("express").Router();
const orderInfo = require("../models/orderModel");
const {
  verifyAndAdmin,
  verifyAndAuthorization,
  verify,
} = require("./verifyRoute");

/* add order */
order.post("/add", verify, async (req, res) => {
  const neworder = new orderInfo(req.body);
  try {
    const savedorder = await neworder.save();
    res.status(200).json(savedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update order
order.put("/update/:id", verifyAndAdmin, async (req, res) => {
  try {
    const updatedorder = await orderInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "order successfully updated", updatedorder });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* delete order */
order.delete("/delete/:id", verifyAndAdmin, async (req, res) => {
  try {
    const order = await orderInfo.findByIdAndDelete(req.params.id);
    //const { password, ...others } = user._doc;
    res.status(200).json({ message: "order deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* get order by id */
order.get("/find/:id", verifyAndAuthorization, async (req, res) => {
  try {
    const orders = await orderInfo.find({ userId: req.params.id });
    const { ...others } = order._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/*get all  */
order.get("/findall", verifyAndAdmin, async (req, res) => {
  try {
    let orders;
    orders = await orderInfo.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = order;
