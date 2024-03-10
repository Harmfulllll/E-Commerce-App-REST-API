const jwt = require("jsonwebtoken");
const { verifyAndAuthorization, verifyAndAdmin } = require("./verifyRoute");
const cryptojs = require("crypto-js");
const userInfo = require("../models/userModel");

const user = require("express").Router();

user.put("/:id", verifyAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  try {
    const updatedUser = await userInfo.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "User successfully updated" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* Get user by id */
user.get("/find/:id", verifyAndAdmin, async (req, res) => {
  try {
    const user = await userInfo.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

/* Get all user */
user.get("/findall", verifyAndAdmin, async (req, res) => {
  const query = req.query.num;
  try {
    const users = query
      ? await userInfo.find().sort({ _id: -1 }).limit(query)
      : await userInfo.find();
    //const { password, ...others } = users._doc;
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

//Delete user by id
user.delete("/delete/:id", verifyAndAdmin, async (req, res) => {
  try {
    const user = await userInfo.findByIdAndDelete(req.params.id);
    //const { password, ...others } = user._doc;
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
module.exports = user;
