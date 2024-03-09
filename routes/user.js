const jwt = require("jsonwebtoken");
const { verifyAndAuthorization } = require("./verifyRoute");
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
module.exports = user;
