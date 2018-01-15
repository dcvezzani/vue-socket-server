exports.up = async function(knex) {
  await knex.schema.createTable("users", function(t) {
    t.increments('id').primary();
    t.string('name');
    t.string('notes');
    t.integer('freeDay');
    t.boolean('freeMeal');
    t.integer('sickDay');
    t.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
