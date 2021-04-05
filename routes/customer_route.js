const express = require("express");
const Customer = require("../models/customer_models");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //validation for users data
const bcryptjs = require("bcryptjs"); //for password encryption
const jwt = require("jsonwebtoken");

router.post(
  "/customer/register",
  [
    check("firstname", "fname should not be empty").not().isEmpty(),
    check("lastname", "lname shouldnot be empty").not().isEmpty(),
    check("email", "Email should not be empty").not().isEmpty(),
    check("password", "password should not be empty").not().isEmpty(),
  ],
  function (req, res) {
    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
      //valid
      const firstname = req.body.firstname; //fetch data from form
      const lastname = req.body.lastname; //fetch data from form
      const email = req.body.email; //fetch data from client
      const password = req.body.password;
      const address = req.body.address;
      const phone = req.body.phone;
      const UserType = req.body.UserType;
      bcryptjs.hash(password, 10, function (hash_err, hash_pw) {
        const data = new Customer({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hash_pw,
          address: address,
          phonenumber: phone,
          UserType: UserType,
        });
        data
          .save()
          .then(function (result) {
            res.status(201).json({ success: true });
          })
          .catch(function (err1) {
            res.status(500).json({ success: false });
          });
      });
    } else {
      //invalid
      res.status(400).json(validationErr.array());
    }
  }
);

router.post("/customer/login", function (req, res) {
  const email = req.body.email; //from form
  const password = req.body.password; //from form

  //check if email is valid or not
  Customer.findOne({ email: email })
    .then(function (customerData) {
      if (customerData == null) {
        //customer not found
        return res.status(403).json({ message: "Invalid email or password" });
      }
      //customer found
      bcryptjs.compare(
        password,
        customerData.password,
        function (err, result1) {
          if (result1 === false) {
            return res
              .status(403)
              .json({ message: "Invalid email or password" });
          }
          //username and password valid
          //token generate

          const token = jwt.sign({ customerId: customerData._id }, "secretkey");
          res.status(200).json({
            success: true,
            token: token,
            message: "Login successful",
          });
        }
      );
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
