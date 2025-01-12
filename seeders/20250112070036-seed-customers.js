'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [{
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password', // Make sure to use a hashed password
      phonenumber: '1234567890',
      customerProfit: 0,
      customerClass: 'Standard',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'hashed_password', // Make sure to use a hashed password
      phonenumber: '0987654321',
      customerProfit: 100.50,
      customerClass: 'Premium',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
