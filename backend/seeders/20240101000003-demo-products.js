'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        unique_id: uuidv4(),
        name: 'Laptop Dell XPS 13',
        price: 1299.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'iPhone 14 Pro',
        price: 999.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Samsung Galaxy S23',
        price: 899.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Sony WH-1000XM5',
        price: 349.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Apple Watch Series 8',
        price: 399.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'MacBook Pro 16',
        price: 2499.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'iPad Pro 12.9',
        price: 1099.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'AirPods Pro',
        price: 249.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Gaming Mouse Logitech',
        price: 79.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Mechanical Keyboard',
        price: 149.99,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
