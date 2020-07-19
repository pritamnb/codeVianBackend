const winston = require('winston');
const express = require('express');
const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype'
  );
  next();
});
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
