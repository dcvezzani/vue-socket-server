exports.up = async function(knex) {
  await knex.schema.createTable("days", function(t) {
    t.increments('id').primary();
    t.integer('weekId');
    t.integer('positiveFood');
    t.text('positiveFoodData');
    t.integer('negativeFood');
    t.text('negativeFoodData');
    t.integer('fruitsVegetables');
    t.integer('water');
    t.integer('waterCupsCnt');
    t.integer('after8');
    t.integer('exercise');
    t.text('exerciseData');
    t.integer('dailyGreatness');
    t.text('dailyGreatnessData');
    t.integer('personalPrayer');
    t.text('personalPrayerData');
    t.integer('scriptureStudy');
    t.text('scriptureStudyData');
    t.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("days");
};
