/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("orders", (table) => {
    table
      .uuid("cust_id")
      .notNullable()
      .references("cust_id")
      .inTable("customers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .alter();

    table
      .uuid("item_id")
      .notNullable()
      .references("item_id")
      .inTable("items")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .alter();

    table
      .uuid("addr_id")
      .notNullable()
      .references("addr_id")
      .inTable("address")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("orders", (table) => {
    table.dropForeign("cust_id");
    table.dropForeign("item_id");
    table.dropForeign("addr_id");
  });
};
