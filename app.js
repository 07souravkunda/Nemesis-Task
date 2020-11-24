const express = require('express');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/globalErrorController');
const authenticationController = require('./controllers/authenticationController');
const userControllers = require('./controllers/userController');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // origin: "https://justrelax-ce045.firebaseapp.com",
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }
  next();
});
app.get('/api/v1/logout', authenticationController.logout);
app.get('/api/v1/fetchUser', authenticationController.fetchUser);
app.get(
  '/api/v1/user',
  authenticationController.sendProtect,
  userControllers.getUser
);
app.post(
  '/api/v1/user',
  authenticationController.sendProtect,
  userControllers.createUser
);
app.delete(
  '/api/v1/user/:id',
  authenticationController.sendProtect,
  userControllers.deleteUser
);

app.post('/api/v1/signin', authenticationController.signin);

app.use('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);

module.exports = app;
