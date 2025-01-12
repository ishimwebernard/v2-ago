const { Manager, Shopkeeper } = require('../models');

module.exports = {
  async createManager(req, res) {
    try {
      const { name, email, password, phonenumber } = req.body;
      const manager = await Manager.create({ name, email, password, phonenumber });
      res.status(201).json(manager);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getManagers(req, res) {
    try {
      const managers = await Manager.findAll();
      res.json(managers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addShopkeeper(req, res) {
    try {
      const { managerId, name, email, password } = req.body;
      const shopkeeper = await Shopkeeper.create({ name, email, password, managerId });
      res.status(201).json(shopkeeper);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteManager(req, res) {
    try {
      const { id } = req.params; // Get manager ID from the route parameters

      // Find the manager by ID
      const manager = await Manager.findByPk(id);
      if (!manager) {
        return res.status(404).json({ error: 'Manager not found' });
      }

      // Delete the manager
      await manager.destroy();

      res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
