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
  async createShopkeeper(req, res) {
    const {name, phonenumber, email, password,managerId} = req.body
    try{
      const newshopkeeper = await Shopkeeper.create({name, phonenumber, email, password,managerId})
      res.status(201).json({message: 'Shopkeeper created'})
    }catch(error){
      res.status(500).json({error: error.message})
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
  async login(req, res){
    const { phonenumber, password } = req.body;

    try {
        // Validate request body
        if (!phonenumber || !password) {
            return res.status(400).json({ message: 'Phone number and password are required.' });
        }

        // Find the user by phone number
        const user = await Shopkeeper.findOne({ where: { phonenumber } });

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
