const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { Restaurantmodel } = require("../models/restaurant.model");
require("dotenv").config();

const restaurantRoute = express.Router();

// add restro
restaurantRoute.post("/restaurants", async (req, res) => {
  try {
    const data = req.body;
    const restaurants = new Restaurantmodel(data);
    await restaurants.save();
    res.send(restaurants);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// get restro
restaurantRoute.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurantmodel.find();
    res.send(restaurants);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// get each restro
restaurantRoute.get("/restaurants/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const restaurants = await Restaurantmodel.findOne({_id:ID});
    res.send(restaurants);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// get each restro menu
restaurantRoute.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const ID = req.params.id;
    const restaurants = await Restaurantmodel.findOne({_id:ID});
    res.send(restaurants.menu);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// get each restro menu
restaurantRoute.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const ID = req.params.id;
    const restaurants = await Restaurantmodel.findOne({_id:ID});
    res.send(restaurants.menu);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// add each restro menu
restaurantRoute.post("/restaurants/:id/menu", async (req, res) => {
  try {
    const ID = req.params.id;
    const restaurants = await Restaurantmodel.findOne({_id:ID});
    const data = req.body;
    restaurants.menu.push(data);
    // await Restaurantmodel.findByIdAndUpdate({_id:ID}, restaurants)
    res.send(restaurants.menu);
  } catch (err) {
    res.send({ err: err.message });
  }
});

// add each restro menu
restaurantRoute.delete("/restaurants/:id/menu/:id2", async (req, res) => {
  try {
    const ID = req.params.id;
    const ID2 = req.params.id2;
    const restaurants = await Restaurantmodel.findOne({_id:ID});
    const data = req.body;
    restaurants.menu.push(data);
    let filter = restaurants.menu.filter((el)=>{
        return el._id==ID2;
    })
    await Restaurantmodel.findByIdAndDelete({_id:ID2})
    res.send(restaurants.menu);
  } catch (err) {
    res.send({ err: err.message });
  }
});


module.exports = {
    restaurantRoute,
};
