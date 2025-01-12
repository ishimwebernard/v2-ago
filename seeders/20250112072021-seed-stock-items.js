'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StockItems', [
      {
        shopkeeperId: 1,
        name: 'Organic Apples',
        quantity: 25,
        price: 1.99,
        picture: 'apples.jpg',
        description: 'Crisp and juicy organic apples from local farms.',
        costprice: 1.50,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
       {
        shopkeeperId: 1,
        name: 'Several Stuff',
        quantity: 40,
        price: 1.99,
        picture: 'apples.jpg',
        description: 'Crisp Stuff and  organic apples from local farms.',
        costprice: 1.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StockItems', null, {});

  }
};
