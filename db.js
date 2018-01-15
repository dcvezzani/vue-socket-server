// #############################################
// EBUG=db-orm:* npm start

/*

knex-migrate generate create_subscribers
knex-migrate pending
knex-migrate list
knex-migrate up


knex-migrate generate create_users
knex-migrate generate create_weeks
knex-migrate generate create_days

ls migrations/*.js | xargs mvim -p

 */

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

var Week = bookshelf.Model.extend({
  tableName: 'weeks'
});

var Day = bookshelf.Model.extend({
  tableName: 'days'
});

// var user = new User({name: "Bob", description: "Somebody new"});
// user.save().then((model) => {
//   console.log("saved user: " + JSON.stringify(model));
// })


// #############################################

module.exports = {User: User, Week: Week, Day: Day}

