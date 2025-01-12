const { StockItem } = require('../models');

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
      const { name, quantity, price, picture } = req.body;
      const stockItem = await StockItem.findByPk(id);
      if (!stockItem) return res.status(404).json({ error: 'StockItem not found' });

      await stockItem.update({ name, quantity, price, picture });
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
};
