
//To get the file name extension line .jpg,.png
const path = require("path");
const Cart = require("../models/cartModel")
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");



//--------------------add to cart------------------

exports.addCart = catchAsync(async (req, res, next) => {
    const { ProductName, ProductPrice, ProductSize} = req.body;
    const cart = await Cart.create({
      ProductName, ProductPrice, ProductSize
      });

  res.status(201).json({
    success: true,
    data: cart,
  });
});

//-------------------Display cart items

exports.getCartItems = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({});

  res.status(201).json({
    success: true,
    count: cart.length,
    data: cart,
  });
});

// -----------------DELETE cart item------------------------

exports.deleteCartItems = catchAsync(async (req, res, next) => {
    const cart = await Cart.findById(req.params.id);
  
    if (!cart) {
      return next(new AppError(`No cart item found `), 404);
    }
  
    await cart.remove();
  
    res.status(200).json({
      success: true,
      count: cart.length,
      data: {},
    });
  });
  