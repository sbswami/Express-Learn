const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 5,
    max: 60
  },
  username: {
    type: String,
    minlength: 6,
    maxlength: 30,
    lowercase: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  dob: {
    type: Date,
    default: Date.now
  },
  working: Boolean,
  skills: {
    type: [String]
  },
  education: [
    {
      school: {
        type: String
      },
      percentage: {
        type: Number
      },
      degree: {
        type: String
      }
    }
  ]
});

module.exports.userSchema = userSchema;
require('../methods/index');
const User = mongoose.model('User', userSchema);
module.exports.User = User;
