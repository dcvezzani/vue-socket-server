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

    // users

    socket.on('fetch_user', function(user){
      new models.User({id: user.id}).fetch().then((model) => {
        io.emit('user_fetched', {action: 'get', type: 'user', model: model});
      })
    });
      
    socket.on('create_user', function(user){
      new models.User().save(user).then((model) => {
        io.emit('user_created', {action: 'create', type: 'user', model: model});
      })
    });
      
    socket.on('update_user', function(user){
      new models.User({id: user.id}).save(user).then((model) => {
        io.emit('user_updated', {action: 'update', type: 'user', model: model});
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
      
    // weeks

    socket.on('fetch_week', function(week){
      new models.Week({id: week.id}).fetch().then((model) => {
        io.emit('week_fetched', {action: 'get', type: 'week', model: model});
      })
    });
    
    socket.on('create_week', function(week){
      new models.Week().save(week).then((model) => {
        io.emit('week_created', {action: 'create', type: 'week', model: model});
      })
    });
      
    socket.on('update_week', function(week){
      new models.Week({id: week.id}).save(week).then((model) => {
        io.emit('week_updated', {action: 'update', type: 'week', model: model});
      })
    });
      
    socket.on('destroy_week', function(week){
      var _model = null;
      new models.Week({id: week.id}).fetch()
      .then((model) => { _model = model; return new models.Week({id: week.id}).destroy() })
      .then(() => {
        io.emit('week_destroyed', {action: 'destroy', type: 'week', model: _model});
      })
    });
      
    // days

    socket.on('fetch_calendar', function(month_id, callback){
      models.Day.where({month: month_id}).fetchAll().then((collection) => {
        let data = {action: 'get', type: 'calendar', collection: collection, callback: callback};
        io.emit('calendar_fetched', data);
      })
    });
    
    socket.on('fetch_day', function(day, callback){
      new models.Day({id: day.id}).fetch().then((model) => {
        let data = {action: 'get', type: 'day', model: model, callback: callback};
        io.emit('day_fetched', data);
      })
    });
    
    socket.on('create_day', function(day){
      new models.Day().save(day).then((model) => {
        io.emit('day_created', {action: 'create', type: 'day', model: model});
      })
    });
      
    socket.on('update_day', function(day){
      new models.Day({id: day.id}).save(day).then((model) => {
        io.emit('day_updated', {action: 'update', type: 'day', model: model});
      })
    });
      
    socket.on('destroy_day', function(day){
      var _model = null;
      new models.Day({id: day.id}).fetch()
      .then((model) => { _model = model; return new models.Day({id: day.id}).destroy() })
      .then(() => {
        io.emit('day_destroyed', {action: 'destroy', type: 'day', model: _model});
      })
    });
      
  });
};

