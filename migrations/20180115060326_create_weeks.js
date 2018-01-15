exports.up = async function(knex) {
  await knex.schema.createTable("weeks", function(t) {
    t.increments('id').primary();
    t.integer('userId');
    t.integer('freebieFood');
    t.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("weeks");
};
