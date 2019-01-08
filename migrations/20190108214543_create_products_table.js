
exports.up = function(knex) {
  return knex.schema.createTable('products', function(t) {
    t.increments('id').unsigned().primary();
    t.string('name').nullable();
    t.string('sku').nullable();
    t.float('price').nullable();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
