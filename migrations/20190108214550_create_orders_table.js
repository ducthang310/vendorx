
exports.up = function(knex) {
  return knex.schema.createTable('orders', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('product_id').nullable();
    t.integer('customer_id').nullable();
    t.float('price').nullable();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
