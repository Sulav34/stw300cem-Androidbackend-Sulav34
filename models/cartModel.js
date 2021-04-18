const mongoose = require("mongoose");
const Cart = mongoose.model("Cart", {
  ProductName: {
    type: String,
  },
  ProductPrice: {
    type: String,
  },
  ProductSize: {
    type: String
  },

  ProductImage:{
    type:String
  }

});
module.exports = Cart;