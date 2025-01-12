var express = require('express');
var router = express.Router();
const managerController = require('../controllers/managerController');
const shopkeeperController = require('../controllers/shopkeeperController');
const customerController = require('../controllers/customerController');
const stockItemController = require('../controllers/stockItemController');
const orderController = require('../controllers/orderController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Manager routes
router.post('/managers', managerController.createManager);
router.get('/managers', managerController.getManagers);
router.post('/managers/shopkeepers', managerController.addShopkeeper);
router.delete('/managers/:id', managerController.deleteManager);


// Shopkeeper routes
router.get('/shopkeepers', shopkeeperController.getShopkeepers);
router.get('/shopkeepers/:id/stock', shopkeeperController.getStock);
router.get('/shopkeepers/:id/orders', shopkeeperController.getOrders);

// Customer routes
router.post('/customers', customerController.createCustomer);
router.get('/customers', customerController.getCustomers);
router.get('/customers/:id/orders', customerController.getOrders);

// StockItem routes
router.post('/stockitems', stockItemController.createStockItem);
router.get('/stockitems', stockItemController.searchForItem);
router.put('/stockitems/:id', stockItemController.updateStockItem);
router.delete('/stockitems/:id', stockItemController.deleteStockItem);

// Order routes
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrder);
router.put('/orders/:id/status', orderController.updateOrderStatus);

module.exports = router;
