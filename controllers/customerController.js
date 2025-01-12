const { Customer, Order } = require('../models');

module.exports = {
  async createCustomer(req, res) {
    try {
      const { name, email, password, referrerId } = req.body;
      const customer = await Customer.create({ name, email, password, referrerId });
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCustomers(req, res) {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrders(req, res) {
    try {
      const customerId = req.params.id;
      const orders = await Order.findAll({ where: { customerId } });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const { customerProfit, customerClass } = req.body;
      const customer = await Customer.findByPk(id);
      if (!customer) return res.status(404).json({ error: 'Customer not found' });
  
      await customer.update({ customerProfit, customerClass });
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
