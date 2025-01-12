'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StockItem.belongsTo(models.Shopkeeper, { foreignKey: 'shopkeeperId' });

    }
  }
  StockItem.init({
    shopkeeperId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    picture: DataTypes.STRING,
    description: DataTypes.STRING,
    costprice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'StockItem',
  });
  return StockItem;
};