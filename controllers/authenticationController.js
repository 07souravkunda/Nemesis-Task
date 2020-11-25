const jwt = require('jsonwebtoken');
const util = require('util');
const asyncCatch = require('../utils/catchAsync');

const AppError = require('../utils/appError');

const cred = { u: 'admin@namasys.co', p: 'admin123' };

exports.signin = (req, res, next) => {
  const { user, password } = req.body;
  if (user !== cred.u || password !== cred.p) {
    return next(new AppError('Incorrect username or password', 401));
  }

  const token = jwt.sign({ id: cred.u }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (token) {
    console.log('cooked');
    res.cookie('jwt', token, { httpOnly: false });
  }

  res.status(200).json({
    status: 'success',
    token,
    user: cred.u,
  });
};

exports.sendProtect = asyncCatch(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('user is not logged in!'));
  }

  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(' ')[1],
    process.env.JWT_PRIVATE_KEY
  );
  console.log(decoded);
  if (cred.u !== decoded.id) {
    return next(new AppError('User does not exist!'));
  }
  req.user = cred.u;
  next();
});

exports.fetchUser = asyncCatch(async (req, res, next) => {
  // console.log('fetching..');
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(200).json({
      status: 'success',
      user: null,
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_KEY
  );

  console.log(decoded);
  if (cred.u !== decoded.id) {
    return next(new AppError('User does not exist'));
  }
  return res.status(200).json({
    status: 'success',
    user: cred.u,
    signin: true,
    token,
  });
});

exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'success',
  });
};
