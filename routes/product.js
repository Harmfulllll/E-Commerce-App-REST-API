const product = require("express").Router();
const productInfo = require("../models/productModel");
const { verifyAndAdmin } = require("./verifyRoute");

/* add product */
product.post("/add", verifyAndAdmin, async (req, res) => {
  const newProduct = new productInfo(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

product.put("/update/:id", verifyAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await productInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product successfully updated", updatedProduct });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* delete product */

product.delete("/delete/:id", verifyAndAdmin, async (req, res) => {
  try {
    const user = await productInfo.findByIdAndDelete(req.params.id);
    //const { password, ...others } = user._doc;
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* get product by id */
product.get("/find/:id", verifyAndAdmin, async (req, res) => {
  try {
    const product = await productInfo.findById(req.params.id);
    const { ...others } = product._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* get products by param */
product.get("/findall", verifyAndAdmin, async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await productInfo.find({
        category: {
          $in: [qCategory],
        },
      });
    } else products = await productInfo.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = product;
