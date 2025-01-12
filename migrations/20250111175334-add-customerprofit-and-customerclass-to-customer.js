'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Customers', 'customerProfit', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0, // Default value for existing rows
    });
    await queryInterface.addColumn('Customers', 'customerClass', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Standard', // Default class for existing rows
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'customerProfit');
    await queryInterface.removeColumn('Customers', 'customerClass');
  },
};
