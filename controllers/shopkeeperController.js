const { Shopkeeper, StockItem, Order } = require('../models');

module.exports = {
  async getShopkeepers(req, res) {
    try {
      const shopkeepers = await Shopkeeper.findAll();
      res.json(shopkeepers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStock(req, res) {
    try {
      const shopkeeperId = req.params.id;
      const stock = await StockItem.findAll({ where: { shopkeeperId } });
      res.json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrders(req, res) {
    try {
      const shopkeeperId = req.params.id;
      const orders = await Order.findAll({ where: { shopkeeperId } });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
