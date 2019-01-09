
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('customer_id').nullable();
    t.string('created_by').nullable();
    t.string('type').nullable();
    t.string('source').nullable();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
