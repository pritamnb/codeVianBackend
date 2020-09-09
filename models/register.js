const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
// testcicd
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get('jwtPrivateKey')
//   );
//   return token;
// };
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    '5ttjPBipfDtn4Q3RFL8ODdNG79DsfND0'
  );
  return token;
};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
