const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = await jwt.verify(token, process.env.key);
      if (decoded) {
        const userId = decoded.userId;
        req.body.user = userId;
        const address = decoded.address;
        req.body.deliveryAddress = address;
        next();
      } else {
        res.send({ msg: "Login First" });
      }
    } else {
      res.send({ msg: "Login First" });
    }
  } catch (err) {
    res.send({ err: err.message });
  }
};

module.exports = {
    authenticate
}