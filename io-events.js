module.exports = function(server) {
  var io = require('socket.io')(server);
  var models = require('./db');
  // new models.User({name: "Dave", description: "cest moi"}).save().then((user) => {
  //   console.log("added: " + user);
  // });
  
  io.on('connection', function(socket){
    console.log('a user connected');
  });
};

