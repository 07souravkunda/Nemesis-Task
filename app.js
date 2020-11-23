const express = require('express');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/globalErrorController');
const authenticationController = require('./controllers/authenticationController');
const userControllers = require('./controllers/userController');

const app = express();

app.use(express.json());

app.post('/api/v1/user', userControllers.createUser);
app.delete('/api/v1/user/:id', userControllers.deleteUser);

app.post('/api/v1/signin', authenticationController.signin);

app.use('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);

module.exports = app;
