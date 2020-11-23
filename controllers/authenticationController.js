const AppError = require('../utils/appError');

const cred = { u: 'admin@namasys.co', p: 'admin123' };

exports.signin = (req, res, next) => {
  const { user, password } = req.body;
  if (user !== cred.u || password !== cred.p) {
    return next(new AppError('Incorrect username or password', 401));
  }

  res.status(200).json({
    status: 'success',
    user: cred.u,
  });
};
