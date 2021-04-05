const asyncHandler = require("../utils/catchAsync");
const ErrorResponse = require("../utils/appError");
const Customer = require("../models/customer_models");
const crypto = require("crypto");

//-------------------------CURRENT USER DETAILS-----------

exports.getMe = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.customer.id);
  res.status(200).json({
    success: true,
    data: customer,
  });
});
