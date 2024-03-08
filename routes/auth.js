const user = require("express").Router();
const userInfo = require("../models/userModel");

user.post("/", async (req, res) => {
  const newUser = new userInfo({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const save = await newUser.save();
    res.status(200).json({
      message: "User has been registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
    });
  }
});

module.exports = user;
