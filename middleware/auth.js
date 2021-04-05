const { rawListeners } = require("../models/productsModel");

const jwt = require("jsonwebtoken");
const customer = require("../models/customer_models");
const { customerinfo } = require("os");

// Login protect
module.exports.verifyUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "secretkey");
    customer
      .findOne({ _id: data.customerId })
      .then(function (result) {
        req.customerinfo = result;

        next();
      })
      .catch(function (e) {
        res.status(401).json({ error: e });
      });
  } catch (e) {
    res.status(401).json({ error: e });
  }
};

// Admin
module.exports.verifyAdmin = function (req, res, next) {
  if (!req.customerinfo) {
    return res.status(401).json({ message: "Invalid User!!" });
  } else if (req.customerinfo.UserType !== "Admin") {
    return req.status(401).json({ message: "Unauthorized!!" });
  }
  next();
};

// Customer
module.exports.verifyCustomer = function (req, res, next) {
  if (req.customerinfo) {
    return res.status(401).json({ message: "Invalid User!!" });
  } else if (req.customerinfo.userType !== "Customer") {
    return req.status(401).json({ message: "Unauthorized!!" });
  }
  next();
};

//fourth guard
module.exports.verifyCustomerAdmin = function (req, res, next) {
  if (req.customerinfo) {
    return res.status(401).json({ message: "Invalid User!!" });
  } else if (
    req.customerinfo.userType !== "Customer" ||
    req.customerinfo.userType !== "Admin"
  ) {
    return req.status(401).json({ message: "Unauthorized!!" });
  }
  next();
};
