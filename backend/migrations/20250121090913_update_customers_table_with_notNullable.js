/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("customers", (table) => {
    table.string("email", 100).notNullable().alter();
    table.string("password", 255).notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("customers", (table) => {
    table.string("email", 100).nullable().alter();
    table.string("password", 255).nullable().alter();
  });
};
