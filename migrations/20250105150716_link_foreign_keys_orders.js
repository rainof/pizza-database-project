/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable("orders", (table) => {
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
    }),

    knex.schema.alterTable("customers", (table) => {
      table
        .uuid("addr_id")
        .notNullable()
        .references("addr_id")
        .inTable("addresses")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.alterTable("orders", (table) => {
      table.dropForeign("cust_id");
      table.dropForeign("item_id");
    }),

    knex.schema.alterTable("customers", (table) => {
      table.dropForeign("addr_id");
    }),
  ]);
};
