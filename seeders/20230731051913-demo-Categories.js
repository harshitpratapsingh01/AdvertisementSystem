'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [{
      Category: "Electronics",
      Subcategory: "Mobiles",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Electronics",
      Subcategory: "Laptops",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Electronics",
      Subcategory: "Tablets",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Furnitures",
      Subcategory: "Sofas",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Furnitures",
      Subcategory: "Double Beds",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Furnitures",
      Subcategory: "Single Beds",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Vhicles",
      Subcategory: "Cars",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Vhicles",
      Subcategory: "Bikes",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Vhicles",
      Subcategory: "Scooties",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      Category: "Vhicles",
      Subcategory: "Comercials",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};