var express = require('express');
var router = express.Router();
const managerController = require('../controllers/managerController');
const shopkeeperController = require('../controllers/shopkeeperController');
const customerController = require('../controllers/customerController');
const stockItemController = require('../controllers/stockItemController');
const orderController = require('../controllers/orderController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ago Shopping API' });
});

// Manager routes
router.post('/managers', managerController.createManager);
router.post('/managers/login', managerController.login)
router.get('/managers', managerController.getManagers);
router.post('/managers/shopkeepers', managerController.addShopkeeper);
router.delete('/managers/:id', managerController.deleteManager);


// Shopkeeper routes
router.get('/shopkeepers', shopkeeperController.getShopkeepers);
router.post('/shopkeepers/login', shopkeeperController.login)
router.get('/shopkeepers/:id/stock', shopkeeperController.getStock);
router.get('/shopkeepers/:id/orders', shopkeeperController.getOrders);

// Customer routes
router.post('/customers', customerController.createCustomer);
router.post('/customers/login', customerController.login);
router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerInfo);
router.get('/customers/:id/orders', customerController.getOrders);
router.get('/customers/:referrerId/slaves', customerController.getAllSlaves)

// StockItem routes
router.post('/stockitems', stockItemController.createStockItem);
router.get('/stockitems', stockItemController.searchForItem);
router.get('/getstockitems', stockItemController.getAllItems)
router.put('/stockitems/:id', stockItemController.updateStockItem);
router.delete('/stockitems/:id', stockItemController.deleteStockItem);
router.get('/getstockitems/:shopkeeperId', stockItemController.getItemByShopKeeper);


// Order routes
router.post('/orders', orderController.createOrder);
router.get('/getallorders', orderController.getAllOrders)
router.get('/orders/:id', orderController.getOrder);
router.put('/orders/:id/status', orderController.updateOrderStatus);
router.get('/orders/customer/:customerId', orderController.getOrdersByCustomer)
router.get('/orders/shopkeeper/:id', orderController.getOrderByShopKeeper)

module.exports = router;
