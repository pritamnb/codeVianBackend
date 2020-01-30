const express = require('express');
const register = require('../routes/register');
const auth = require('../routes/auth');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/user', register);
  app.use('/api/login', auth);
};
