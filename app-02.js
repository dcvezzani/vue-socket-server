var app = require('express')();

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;

