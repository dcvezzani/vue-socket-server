// #############################################
// DEBUG=db-orm:* npm start

// var orm = require("orm");
// console.log(JSON.stringify(orm));

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./dev.sqlite3"
  }, 
  useNullAsDefault: true
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

// var user = new User({name: "Bob", description: "Somebody new"});
// user.save().then((model) => {
//   console.log("saved user: " + JSON.stringify(model));
// })


// #############################################

module.exports = {User: User}

