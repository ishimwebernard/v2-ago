const { Customer, Order } = require('../models');
const bcrypt = require("bcrypt")

module.exports = {
  async createCustomer(req, res) {
    try {
      const { name, email, password, referrerId, phonenumber } = req.body;
      const customer = await Customer.create({ name, email, password, referrerId, phonenumber });
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
  async login(req, res){
    const { phonenumber, password } = req.body;

    try {
        // Validate request body
        if (!phonenumber || !password) {
            return res.status(400).json({ message: 'Phone number and password are required.' });
        }

        // Find the user by phone number
        const user = await Customer.findOne({ where: { phonenumber } });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the password matches
        console.log(password, user.password)
        const isPasswordValid = password === user.password

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Respond with the token and user data (omit sensitive fields)
        return res.status(200).json({
            message: 'Login successful.',
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                name: user.name, // Include other relevant fields if necessary
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred while logging in.' });
    }
}
};
