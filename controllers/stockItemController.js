const { StockItem } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async createStockItem(req, res) {
    try {
      const { shopkeeperId, name, quantity, price, picture, description, costprice } = req.body;
      const stockItem = await StockItem.create({ shopkeeperId, name, quantity, price, picture, description, costprice });
      res.status(201).json(stockItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStockItem(req, res) {
    try {
      const { id } = req.params;
      const { name, quantity, price, picture, costprice, description } = req.body;
      const stockItem = await StockItem.findByPk(id);
      if (!stockItem) return res.status(404).json({ error: 'StockItem not found' });

      await stockItem.update({ name, quantity, price, picture, costprice, description });
      res.json(stockItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteStockItem(req, res) {
    try {
      const { id } = req.params;
      const stockItem = await StockItem.findByPk(id);
      if (!stockItem) return res.status(404).json({ error: 'StockItem not found' });

      await stockItem.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async searchForItem(req, res) {
    const searchTerm = req.query.key;
    
    try{
      const stockItems = await StockItem.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
          ],
        },
      });
      res.json(stockItems)
    }catch(error) {
      res.status(500).json({error: error.message})
    }
  },
  async getAllItems(req, res) {    
    try{
      const stockItems = await StockItem.findAll();
      res.json(stockItems)
    }catch(error) {
      res.status(500).json({error: error.message})
    }
  },
  async getItemByShopKeeper(req, res){
    try{
      const {shopkeeperId} = req.params
      const items = await StockItem.findAll(
       {
        where: {
          shopkeeperId: shopkeeperId
        }
       }
      )
      return res.status(200).json(items)
    }catch(error){
      return res.status(500).json({error: error.message})
    }
  }
};
