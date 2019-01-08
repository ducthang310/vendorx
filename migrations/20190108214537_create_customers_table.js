
exports.up = function(knex) {
  return knex.schema.createTable('customers', function(t) {
    t.increments('id').unsigned().primary();
    t.string('name').nullable();
    t.string('email').nullable();
    t.string('phone').nullable();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers');
};
