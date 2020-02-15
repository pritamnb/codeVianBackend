const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Room = require('../models/chat');
const auth = require('../middleware/auth'); // authorization

const createRoom = async chat => {
  console.log('creating room');
  var chat = new Room({
    type: chat.type,
    messages: {
      from: chat.message.from,
      body: chat.message.body
    }
  });
  chat.save((err, res) => {
    if (err) return console.error('something went wrong', err);
  });
};

// sockets

const socketPort = 9697;
const io = require('socket.io').listen(socketPort).sockets;

io.on('connection', socket => {
  console.log(socket.client.id + ' is connected.');
  socket.emit('connected', { clientId: socket.client.id });
  socket.on('send_message', message => {
    console.log(message + 'received');
    socket.emit('new_message', { msg: message });
  });
});
