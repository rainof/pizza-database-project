// Migration to create 'orders' table

exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("row_id").primary();
    table.string("order_id", 10).notNullable();
    table.timestamp("created_at").notNullable();
    table.string("item_id", 10).notNullable();
    table.integer("quantity", 10).notNullable();
    table.string("cust_id", 10).notNullable();
    table.boolean("delivery").notNullable();
    table.string("addr_id", 10).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orders");
};
