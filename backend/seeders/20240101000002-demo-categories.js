'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        unique_id: uuidv4(),
        name: 'Electronics',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Clothing',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Books',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Home & Kitchen',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: uuidv4(),
        name: 'Sports',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
