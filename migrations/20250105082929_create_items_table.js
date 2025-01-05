/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("item_id").primary();
    table.string("item_name").notNullable();
    table.string("item_category").notNullable();
    table.string("item_size").notNullable();
    table.string("item_price").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
