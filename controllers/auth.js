const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc   Register User
//@route   POST /api/v1/auth/register

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  //Create user
  const user = await User.create({
    name,
    email,
    password
  });
  //Create token
  sendTokenResponse(user, 200, res);
})

// @desc   Login User
//@route   POST /api/v1/auth/login

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  //check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
})

//@desc Log out user
//@route GET /api/v1/auth/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    data: {},
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })
}

//@desc Logged in user
//@route GET /api/v1/auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc Logged in user
//@route POST /api/v1/auth/forgotPassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are reciving this emial because you (or somone else..uh oh!) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });
    res.status(200).json({ success: true, data: 'Email has been sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc Reset Password
//@route PUT /api/v1/auth/resetPassword/:resettoken
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

//@desc Update user details
//@route PUT /api/v1/auth/updatedetails
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  }
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc Update Password
//@route PUT /api/v1/auth/updatepassword
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});