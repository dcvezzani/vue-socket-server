exports.up = async function(knex) {
  await knex.schema.createTable("users", function(t) {
    t.increments('id').primary();
    t.string('name');
    t.text('description');
    t.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
