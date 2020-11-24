const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncCatch = require('../utils/catchAsync');

exports.getUser = asyncCatch(async (req, res, next) => {
  const users = (await User.find()).reverse();
  res.status(200).json({
    status: 'success',
    users,
  });
});

exports.createUser = asyncCatch(async (req, res, next) => {
  const userObj = {
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    mobile: req.body.mobile,
  };
  const user = await User.create(userObj);
  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteUser = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError('User doesnot exist', 404));
  }
  res.status(200).json({
    status: 'success',
    user: {},
  });
});
