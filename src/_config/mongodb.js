const mongoose = require('mongoose');

require('dotenv').config({path: __dirname + '/../..env'})

const mongoURI = process.env.MONGODB_URI
      ? process.env.MONGODB_URI
      : 'mongodb://localhost/teleodonto';

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(mongoURI, mongoOptions, function(error) {
  if (error) {
    console.warn("[MONGODB] Can't connect to server");
    console.error(error)
  }
});

const mongoConnection = mongoose.connection;

mongoConnection.once('open', function() {
  console.log('[MONGODB] Connected');
})