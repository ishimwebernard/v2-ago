const { Order, OrderItem, Customer } = require('../models');
const { StockItem } = require('../models');

const updateCustomerClass = (customerProfit) => {
    let customerClass;
  
    if (customerProfit >= 200000) {
      customerClass = "Diamond";
    } else if (customerProfit >= 100000) {
      customerClass = "Gold";
    } else if (customerProfit >= 50000) {
      customerClass = "Bronze";
    } else if (customerProfit >= 40000) {
      customerClass = "Copper";
    } else if (customerProfit >= 30000) {
      customerClass = "Silver";
    } else if (customerProfit >= 20000) {
      customerClass = "Stone";
    } else if (customerProfit >= 10000) {
      customerClass = "Sand";
    } else if (customerProfit >= 5000) {
      customerClass = "Clay";
    } else if (customerProfit >= 1000) {
      customerClass = "Customer";
    } else {
      customerClass = "New"; // Default for profits below 1000
    }
  
    return customerClass;
  };
  

const updateCustomerProfit = (customerProfit) => {
    let percentageToGive;
  
    if (customerProfit >= 200000) {
      percentageToGive = 25;
    } else if (customerProfit >= 100000) {
      percentageToGive = 23;
    } else if (customerProfit >= 50000) {
      percentageToGive = 22;
    } else if (customerProfit >= 40000) {
      percentageToGive = 20;
    } else if (customerProfit >= 30000) {
      percentageToGive = 17;
    } else if (customerProfit >= 20000) {
      percentageToGive = 15;
    } else if (customerProfit >= 10000) {
      percentageToGive = 12;
    } else if (customerProfit >= 5000) {
      percentageToGive = 10;
    } else if (customerProfit >= 1000) {
      percentageToGive = 5;
    } else {
      percentageToGive = 0; // Default for profits below 1000
    }
  
    return percentageToGive;
  };
  

module.exports = {
    async createOrder(req, res) {
        const { customerId, shopkeeperId, items } = req.body;
        let totalPrice = 0;
        let totalCostPrice = 0;
        try {
            // Step 1: Create the order
            const newOrder = await Order.create({
                customerId,
                shopkeeperId,
                totalPrice: totalPrice,
                status: 'Pending'
            });
          // Step 2: Create the associated order items and update stock quantities
          for (const item of items) {
            const stockItem = await StockItem.findByPk(item.stockItemId);
            
    
            if (!stockItem) {
              return res.status(404).json({ message: `StockItem with ID ${item.stockItemId} not found.` });
            }
    
            // Check if sufficient stock is available
            if (stockItem.quantity < item.quantity) {
              return res.status(400).json({ message: `Insufficient stock for item: ${stockItem.name}.` });
            }
    
            // Deduct the quantity from the stock item
            stockItem.quantity -= item.quantity;
            await stockItem.save();
    
            // Create the order item
            await OrderItem.create({
              orderId: newOrder.id,
              stockItemId: item.stockItemId,
              quantity: item.quantity,
              price: stockItem.price,
              costprice: stockItem.costprice,
              totalPrice: stockItem.price * item.quantity,
            });
            totalPrice += stockItem.price * item.quantity;
            totalCostPrice += stockItem.costprice * item.quantity;
          }

           //Step 2.1 Update the total         
           newOrder.update({
            totalPrice: totalPrice
           })     
    
          // Step 3: Update the customer's profit
          const customer = await Customer.findByPk(customerId);
          if (!customer) {
            return res.status(404).json({ message: `Customer with ID ${customerId} not found.` });
          }

          customer.customerProfit += (totalPrice-totalCostPrice); // Add the total price to the customer's profit
          customer.customerClass = updateCustomerClass(customer.customerProfit)
          if (customer.referrerId != null){
            customer.percentagetogive = updateCustomerProfit(customer.customerProfit)
          }
          await customer.save();
          
          //Step 3.1 Now, the percentage will be stored to the customer and on every transaction, he will give the profit to the referee
          //To add more categories
            //Distribute the profit

          if (customer.referrerId){
             const customerReferrer = await Customer.findOne({where: {id:customer.referrerId}})
             if (!isNaN(customerReferrer.referrerId)){
                customerReferrer.pfr += customer.percentagetogive/100
                await customerReferrer.save()
             }
          }  
                   
          // Step 4: Respond with the newly created order
          return res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error', error });
        }
      },
    

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, { include: OrderItem });
      if (!order) return res.status(404).json({ error: 'Order not found' });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: 'Order not found' });

      await order.update({ status });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
