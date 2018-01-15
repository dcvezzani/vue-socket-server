module.exports = function(server) {
  var io = require('socket.io')(server);
  var models = require('./db');
  // new models.User({name: "Dave", description: "cest moi"}).save().then((user) => {
  //   console.log("added: " + user);
  // });
  
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('emit_method', function(msg){
      console.log("received 'emit_method' with: " + JSON.stringify(msg));
      io.emit('got_it', msg);
    });

    socket.on('create_user', function(user){
      new models.User().save(user).then(() => {
        io.emit('user_created', {action: 'create', type: 'user', model: user});
      })
    });
      
    socket.on('update_user', function(user){
      new models.User({id: user.id}).save(user).then(() => {
        io.emit('user_updated', {action: 'update', type: 'user', model: user});
      })
    });
      
    socket.on('destroy_user', function(user){
      var _model = null;
      new models.User({id: user.id}).fetch()
      .then((model) => { _model = model; return new models.User({id: user.id}).destroy() })
      .then(() => {
        io.emit('user_destroyed', {action: 'destroy', type: 'user', model: _model});
      })
    });
      
  });
};

