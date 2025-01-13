const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("addresses").del();
  await knex("customers").del();
  await knex("items").del();
  await knex("orders").del();

  // Generate UUIDs for consistency
  const addr1Id = uuidv4();
  const addr2Id = uuidv4();

  const cust1Id = uuidv4();
  const cust2Id = uuidv4();

  const pizzaMargheritaId = uuidv4();
  const pizzaPepperoniId = uuidv4();
  const garlicBreadId = uuidv4();
  const sodaCokeId = uuidv4();

  // Insert mock data into tables
  await knex("addresses").insert([
    {
      addr_id: addr1Id,
      addr_1: "12 Pizza Lane",
      addr_2: "Suite 3A",
      city: "Cheesetown",
      zipcode: "11111",
    },
    {
      addr_id: addr2Id,
      addr_1: "34 Topping Blvd",
      addr_2: null,
      city: "Doughville",
      zipcode: "22222",
    },
  ]);

  await knex("customers").insert([
    {
      cust_id: cust1Id,
      firstname: "Mario",
      lastname: "Rossi",
      addr_id: addr1Id,
    },
    {
      cust_id: cust2Id,
      firstname: "Luigi",
      lastname: "Verdi",
      addr_id: addr2Id,
    },
  ]);

  await knex("items").insert([
    {
      item_id: pizzaMargheritaId,
      item_name: "Pizza Margherita",
      item_category: "Pizza",
      item_size: "Large",
      item_price: "12.99",
    },
    {
      item_id: pizzaPepperoniId,
      item_name: "Pizza Pepperoni",
      item_category: "Pizza",
      item_size: "Medium",
      item_price: "14.99",
    },
    {
      item_id: garlicBreadId,
      item_name: "Garlic Bread",
      item_category: "Side",
      item_size: "Regular",
      item_price: "5.99",
    },
    {
      item_id: sodaCokeId,
      item_name: "Soda (Coke)",
      item_category: "Drink",
      item_size: "500ml",
      item_price: "2.49",
    },
  ]);

  await knex("orders").insert([
    {
      row_id: uuidv4(),
      order_id: "PIZZA001",
      created_at: new Date(),
      item_id: pizzaMargheritaId,
      quantity: 1,
      cust_id: cust1Id,
      delivery: true,
    },
    {
      row_id: uuidv4(),
      order_id: "PIZZA002",
      created_at: new Date(),
      item_id: pizzaPepperoniId,
      quantity: 2,
      cust_id: cust2Id,
      delivery: true,
    },
    {
      row_id: uuidv4(),
      order_id: "PIZZA003",
      created_at: new Date(),
      item_id: garlicBreadId,
      quantity: 3,
      cust_id: cust1Id,
      delivery: false,
    },
    {
      row_id: uuidv4(),
      order_id: "PIZZA004",
      created_at: new Date(),
      item_id: sodaCokeId,
      quantity: 4,
      cust_id: cust2Id,
      delivery: false,
    },
  ]);
};
