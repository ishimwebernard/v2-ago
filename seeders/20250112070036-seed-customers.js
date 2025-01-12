'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password',
        phonenumber: '0987654321',
        pfr: 1000,
        percentagetogive: 10,
        customerProfit: 500,
        customerClass: 'Premium',
        referrerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        phonenumber: '0123456789',
        pfr: 1500,
        percentagetogive: 15,
        customerProfit: 750,
        customerClass: 'Standard',
        referrerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashed_password',
        phonenumber: '1234567890',
        pfr: 2000,
        percentagetogive: 20,
        customerProfit: 1000,
        customerClass: 'Premium',
        referrerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
        password: 'hashed_password',
        phonenumber: '2345678901',
        pfr: 2500,
        percentagetogive: 25,
        customerProfit: 1250,
        customerClass: 'Standard',
        referrerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carol White',
        email: 'carol@example.com',
        password: 'hashed_password',
        phonenumber: '3456789012',
        pfr: 3000,
        percentagetogive: 30,
        customerProfit: 1500,
        customerClass: 'Premium',
        referrerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
