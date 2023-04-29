const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/user.model");
const { authenticate } = require("../middleware/authenticate");
require("dotenv").config();

const userRoute = express.Router();

// Register
userRoute.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const user = new Usermodel(data);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// Login
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (user != undefined) {
      const result = await bcrypt.compare(password, user.password);
      if (result == true) {
        const token = await jwt.sign(
          { userId: user._id, address: user.address },
          process.env.key
        );
        res.send({ token, address: user.address, userId: user._id });
      } else {
        res.send({ msg: "Wrong credentials" });
      }
    } else {
      res.send({ msg: "Wrong credentials" });
    }
  } catch (err) {
    res.send({ err: err.message });
  }
});

// Reset Password
userRoute.patch("/user/:id/reset", authenticate, async (req, res) => {
  try {
    const ID = req.params.id;
    const update = req.body;
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
    const user = await Usermodel.findOne({_id: ID});
    if(user != undefined){
        await Usermodel.findByIdAndUpdate({_id: ID}, update);
        res.send("Password Update successfully");
    }else{
        res.send("Something went wrong");
    }
  } catch (err) {
    res.send({ err: err.message });
  }
});

module.exports = {
  userRoute,
};
