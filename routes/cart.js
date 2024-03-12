const cart = require("express").Router();
const cartInfo = require("../models/cartModel");
const {
  verifyAndAdmin,
  verifyAndAuthorization,
  verify,
} = require("./verifyRoute");

/* add cart */
cart.post("/add", verify, async (req, res) => {
  const newCart = new cartInfo(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update cart
cart.put("/update/:id", verifyAndAuthorization, async (req, res) => {
  try {
    const updatedcart = await cartInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "cart successfully updated", updatedcart });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* delete cart */
cart.delete("/delete/:id", verifyAndAuthorization, async (req, res) => {
  try {
    const user = await cartInfo.findByIdAndDelete(req.params.id);
    //const { password, ...others } = user._doc;
    res.status(200).json({ message: "cart deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* get cart by id */
cart.get("/find/:id", verifyAndAuthorization, async (req, res) => {
  try {
    const cart = await cartInfo.findOne({ userId: req.params.id });
    const { ...others } = cart._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/*get all  */
cart.get("/findall", verifyAndAdmin, async (req, res) => {
  try {
    let carts;
    carts = await cartInfo.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = cart;
