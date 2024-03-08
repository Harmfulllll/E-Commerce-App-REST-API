const user = require("express").Router();
const userInfo = require("../models/userModel");
const cryptojs = require("crypto-js");

user.post("/register", async (req, res) => {
  const newUser = new userInfo({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const save = await newUser.save();
    res.status(200).json({
      message: "User has been registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

user.post("/login", async (req, res) => {
  try {
    const data = await userInfo.findOne({ username: req.body.username });
    if (!data) return res.status(500).json({ message: "No user found" });
    const pass = cryptojs.AES.decrypt(
      data.password,
      process.env.PASSWORD_SECRET
    );
    const pass1 = pass.toString(cryptojs.enc.Utf8);
    if (pass1 !== req.body.password) {
      return res.status(500).json({ message: "No user found" });
    }
    return res.status(200).json({ message: "User found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = user;
