/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("address", (table) => {
    table.uuid("addr_id").primary();
    table.string("addr_1").notNullable();
    table.string("addr_2").nullable();
    table.string("city").notNullable();
    table.string("zipcode").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("address");
};
