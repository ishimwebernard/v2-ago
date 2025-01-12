'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StockItems', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StockItems', 'description');
  }
};
