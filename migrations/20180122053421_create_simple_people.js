
exports.up = function(knex, Promise) {
    // return knex.schema.createTable('products', function(t) {
    //     t.increments('id').unsigned().primary();
    //     t.dateTime('createdAt').notNull();
    //     t.dateTime('updatedAt').nullable();
    //     t.dateTime('deletedAt').nullable();

    //     t.string('name').notNull();
    //     t.text('decription').nullable();
    //     t.decimal('price', 6, 2).notNull();
    //     t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
    // });
  
    return knex.schema.createTable('simple_people', function(t) {
        t.increments('id').unsigned().primary();
        t.text('name').notNull();
        t.integer('points').nullable();
        t.text('details').nullable();
        t.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('simple_people');
};
