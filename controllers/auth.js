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

exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  // const user = await User.findById(req.params.id);
  const { firstname, lastname, email, address, phonenumber } = req.body;

  // if (!user) {
  //   return next(new ErrorResponse("User not found"), 404);
  // }

  User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, address, phonenumber },{new:true},
    function (err, docs) {
      if (err) {
        res.status(200).json({
          success: false,
          error:err.message,
        });
      }
      else {
        res.status(200).json({
          success: true,
          data: docs,
        });
      }
    }
  )

  //   let newuser = await user.updateOne({_id : id}, {firstName:firstName,lastName:lastName,email:email,address:address,phone:phone})
  // ;
  //   res.status(200).json({
  //     success: true,
  //     data: newuser,
  //   });

})
