const express = require("express");
const { Ordermodel } = require("../models/order.model");
const { authenticate } = require("../middleware/authenticate");

const orderRoute = express.Router();

// Add Orders
orderRoute.post("/orders", authenticate, async (req, res) => {
  try {
    const data = req.body;
    const orders = new Ordermodel(data);
    orders.totalPrice = orders.items.reduce((acc, el) => {
      return acc + (el.price * el.quantity);
    }, 0);
    // orders.totalPrice = orders.items[0].price * orders.items[0].quantity;
    await orders.save();
    res.send(orders);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// each Order get
orderRoute.get("/orders/:id", authenticate, async (req, res) => {
  try {
    const ID = req.params.id;
    const order = await Ordermodel.findOne({ _id: ID });
    res.send(order);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// each Order update
let count = 0;
let arr = ["placed", "preparing", "on the way", "delivered"];
orderRoute.patch("/orders/:id", authenticate, async (req, res) => {
  try {
    count++;
    if (count > 3) {
      count = 3;
    }
    const ID = req.params.id;
    const order = await Ordermodel.findOne({ _id: ID });
    await Ordermodel.findByIdAndUpdate({ _id: ID }, { status: arr[count] });
    res.send("Order Updated of ID" + ID + "to" + arr[count]);
  } catch (err) {
    res.send({ err: err.message });
  }
});

module.exports = {
  orderRoute,
};
