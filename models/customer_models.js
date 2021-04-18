const mongoose = require("mongoose");
const Customer = mongoose.model("Customer", {
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  UserType: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer", //less previlage
  },
  Photo:{
    type:String
  }
});

module.exports = Customer;
