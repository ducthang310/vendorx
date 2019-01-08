
exports.up = function(knex) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id').unsigned().primary();
    t.string('name').nullable();
    t.string('email').nullable();
    t.string('password_hash').nullable();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
