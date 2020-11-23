const mongoose = require('mongoose');
const validator = require('validator');

const validateUsername = (username) => {
  if (username.includes(' ')) return false;
  return validator.isAlphanumeric(username, validator.AlphanumericLocale);
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please give a username'],
    validate: {
      validator: function (username) {
        return validateUsername(username);
      },
      message: 'Username should have only alphanumeric characters and no space',
    },
  },
  email: {
    type: String,
    required: [true, 'Please give an email'],
    unique: [true, 'The email exists'],
    lowercase: true,
    validate: {
      validator: function (email) {
        console.log(this.name);
        console.log(validator.isEmail(email));
        return validator.isEmail(email);
      },
      message: 'Please provide a valid email id',
    },
  },
  mobile: {
    type: Number,
    required: [true, 'Please give a valid mobile number'],
    minlength: 10,
    maxlength: 10,
  },
  address: {
    type: String,
    required: [true, 'Please give a valid address'],
  },
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
