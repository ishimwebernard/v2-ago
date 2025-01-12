async createOrder(req, res) {
    try {
      const { customerId, shopkeeperId, items } = req.body;

      const order = await Order.create({
        customerId,
        shopkeeperId,
        totalPrice: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
        status: 'Pending',
      });

      const orderItems = items.map(item => ({
        orderId: order.id,
        stockItemId: item.stockItemId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price,
      }));

      await OrderItem.bulkCreate(orderItems);
      res.status(201).json({ order, items: orderItems });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },