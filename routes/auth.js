const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models/register');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  // console.log('***********', user);

  if (!user) return res.status(400).send('Invalid email or password');

  // bcrypt
  const validPassword = await bcrypt.compare(
    req.body.password,
    user['password']
  );
  // console.log('password check ********', validPassword);

  if (!validPassword) return res.status(400).send('Invalid email or password');
  const token = user.generateAuthToken();
  // console.log(token.toString());
  const payload = {
    token
  };
  res.send(payload);
});

function validateUser(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
