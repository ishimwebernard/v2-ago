'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'customerId' });
      Customer.hasMany(models.Customer, { as: 'ReferredCustomers', foreignKey: 'referrerId' });
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    customerProfit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    customerClass: {
      type: DataTypes.STRING,
      defaultValue: 'Standard',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};