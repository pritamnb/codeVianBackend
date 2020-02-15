const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  members: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    from: mongoose.Schema.Types.ObjectId,
    body: String
  }
});

const Room = mongoose.model('room', roomSchema);

exports.Room = Room;
