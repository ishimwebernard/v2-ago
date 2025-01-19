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
      const { managerId, name, email, password, phonenumber } = req.body;
      const shopkeeper = await Shopkeeper.create({ name, email, password, managerId, phonenumber });
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
  async login(req, res){
    const { phonenumber, password } = req.body;

    try {
        // Validate request body
        if (!phonenumber || !password) {
            return res.status(400).json({ message: 'Phone number and password are required.' });
        }

        // Find the user by phone number
        const user = await Manager.findOne({ where: { phonenumber } });

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
