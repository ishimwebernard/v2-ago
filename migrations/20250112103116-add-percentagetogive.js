'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Customers', 'percentagetogive', {
      type: Sequelize.FLOAT,
      allowNull: true,
      default: 0
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('OrderItems', 'percentagetogive');
  }
};
