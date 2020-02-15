const express = require('express');
const register = require('../routes/register');
const auth = require('../routes/auth');
// const chat = require('../routes/chat');
const Room = require('../models/chat');
const contacts = require('../routes/contacts');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/user', register);
  app.use('/api/login', auth);
  app.use('/api/contacts', contacts);
  // app.use('/api/chat', chat);

  // socket communication
  // const createRoom = async chat => {
  //   console.log('creating room');
  //   var chat = new Room({
  //     type: chat.type,
  //     messages: {
  //       from: chat.message.from,
  //       body: chat.message.body
  //     }
  //   });
  //   chat.save((err, res) => {
  //     if (err) return console.error('something went wron', err);
  //   });
  // };

  // sockets

  const socketPort = 9697;
  const io = require('socket.io').listen(socketPort).sockets;

  io.on('connection', socket => {
    console.log(socket.client.id + ' is connected.');
    socket.emit('connected', { clientId: socket.client.id }, '*************');
    socket.on('send_message', message => {
      console.log('client I think');

      io.emit('new_message', { msg: message });
    });
  });
};
