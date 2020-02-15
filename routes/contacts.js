const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/register');
const auth = require('../middleware/auth'); // authorization

// for all contacts
router.get('/all', auth, async (req, res) => {
  const users = await User.find().select('-password -_id -__v');
  console.log('get contacts hit', users);
  res.send(users);
});
module.exports = router;
