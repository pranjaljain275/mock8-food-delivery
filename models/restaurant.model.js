const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    price: Number,
    image: String,
  },
  {
    versionKey: false,
  }
);

const restaurantSchema = mongoose.Schema(
  {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    menu: [menuSchema],
  },
  {
    versionKey: false,
  }
);

const Menumodel = mongoose.model("menu", menuSchema);
const Restaurantmodel = mongoose.model("restaurant", restaurantSchema);

module.exports = {
  Restaurantmodel,
  Menumodel,
};
