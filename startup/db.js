const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const winston = require('winston');
const localdb = 'mongodb://localhost/task';
const livedb =
  'mongodb+srv://nodeapp:nodeapp123@cluster0.wd7cc.mongodb.net/task?retryWrites=true&w=majority';
module.exports = function () {
  mongoose
    .connect('mongodb://localhost/task', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => winston.info('Connected to MongoDB'));
};
