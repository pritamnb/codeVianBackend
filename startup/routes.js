const express = require('express');
const register = require('../routes/register');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/user', register);
};
