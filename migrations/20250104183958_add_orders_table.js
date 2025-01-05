// Migration to create 'orders' table

exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("row_id").primary();
    table.string("order_id", 10).notNullable();
    table.timestamp("created_at").notNullable();
    table.string("item_id", 10).notNullable();
    table.integer("quantity").notNullable();
    table.string("cust_firstname", 50).notNullable();
    table.string("cust_lastname", 50).notNullable();
    table.boolean("delivery").notNullable();
    table.string("delivery_address1", 200).notNullable();
    table.string("delivery_address2", 200).notNullable();
    table.string("delivery_city", 50).notNullable();
    table.string("delivery_zipcode", 20).notNullable();
  });
};

exports.down = function (knex) {
  return;
};
