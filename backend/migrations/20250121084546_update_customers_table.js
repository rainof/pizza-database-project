/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("customers", (table) => {
    table.string("email", 100).unique();
    table.string("password", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("customers", (table) => {
    table.dropColumn("email");
    table.dropColumn("password");
  });
};
