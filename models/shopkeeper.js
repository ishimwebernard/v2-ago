'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shopkeeper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shopkeeper.belongsTo(models.Manager, { foreignKey: 'managerId' });
      Shopkeeper.hasMany(models.StockItem, { foreignKey: 'shopkeeperId' });
      Shopkeeper.hasMany(models.Order, { foreignKey: 'shopkeeperId' });
    }
  }
  Shopkeeper.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    managerId: DataTypes.INTEGER,
    phonenumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shopkeeper',
  });
  return Shopkeeper;
};