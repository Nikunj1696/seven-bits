const jwt = require("jwt-then");
const User = require("../models/user.model");
const { Container } = require("typedi");
const constants = require("../utils/constants");

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.json({
        status: 401,
        message: "Invalid Token",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, constants.SALT);
	const userVerified = await User.findOne({ _id: payload.id, token: token });
    Container.set("auth-user", userVerified);

    req.payload = payload;
    next();
  } catch (error) {
    res.json({
      status: 401,
      message: "Invalid Token",
    });
  }
};

module.exports = { isAuth };
