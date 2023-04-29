const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { restaurantRoute } = require("./routes/restaurant.route");
const { orderRoute } = require("./routes/order.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", restaurantRoute);
app.use("/api", orderRoute);

app.get("/", (req,res)=>{
    res.send("Welcome to food delivery app");
})

app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log("DB connected");
    } catch (err) {
        console.log("DB not connected");
    }
    console.log(`Server is running on port ${process.env.port}`);
})