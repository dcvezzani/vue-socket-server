module.exports = function(server) {
  var io = require('socket.io')(server);
  var models = require('./db');
  // new models.User({name: "Dave", description: "cest moi"}).save().then((user) => {
  //   console.log("added: " + user);
  // });
  
  var activeUsers = {}
  
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){

      // socket.broadcast.to(roomName).emit('user_leave', {user_name: "johnjoe123"});
      // io.emit('user_leave', {user_name: "johnjoe123"});
    });
        
    socket.on('emit_method', function(msg){
      console.log("received 'emit_method' with: " + JSON.stringify(msg));
      io.emit('got_it', msg);
    });

    socket.on('login', function(person, callback){
      console.log("logging in: " + person);
      activeUsers[person] = true;
      io.emit(callback, {person: person, activeUsers:activeUsers});
    });

    socket.on('logout', function(person, callback){
      console.log("logging out: " + person);
      delete activeUsers[person]; 
      io.emit(callback, {person: person, activeUsers:activeUsers});
    });

    // simple_people

    socket.on('fetch_people', function(callback){
      if (typeof callback === 'undefined')
        callback = 'people_fetched';

      new models.SimplePerson().fetchAll().then((collection) => {
      // models.Day.where({month: month_id}).fetchAll().then((collection) => {
        io.emit(callback, {action: 'index', type: 'simple_person', collection: collection, callback: callback});
      })
    });
      
    socket.on('fetch_person', function(person, callback){
      if (typeof callback === 'undefined')
        callback = 'person_fetched';

      new models.SimplePerson({id: person.id}).fetch().then((model) => {
        io.emit(callback, {action: 'get', type: 'simple_person', model: model});
      })
    });
      
    socket.on('create_person', function(person, callback){
      if (typeof callback === 'undefined')
        callback = 'person_created';

      new models.SimplePerson().save(person).then((model) => {
        io.emit(callback, {action: 'create', type: 'simple_person', model: model});
      })
    });
      
    socket.on('update_person', function(person, callback){
      console.log(person);
      if (typeof callback === 'undefined')
        callback = 'person_updated';

      new models.SimplePerson({id: person.id}).save(person).then((model) => {
        io.emit(callback, {action: 'update', type: 'simple_person', model: model});
      })
    });
      
    socket.on('destroy_person', function(person, callback){
      if (typeof callback === 'undefined')
        callback = 'person_destroyed';

      var _model = null;
      new models.SimplePerson({id: person.id}).fetch()
      .then((model) => { _model = model; return new models.SimplePerson({id: person.id}).destroy() })
      .then(() => {
        io.emit(callback, {action: 'destroy', type: 'simple_person', model: _model});
      })
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

