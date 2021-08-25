var express = require('express');
var router = express.Router();

// Require controller modules
var index_controller = require('../controllers/indexController');
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');
var item_instance_controller = require('../controllers/itemInstanceController');

/* GET home page. */
router.get('/', index_controller.index);

/// CATEGORY ROUTES ///

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating a Category.
router.post('/category/create', category_controller.category_create_post);

// GET request for deleting a Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request for deleting a Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request for updating a Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request for updating a Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_details);


/// ITEM ROUTES ///

// GET request for creating an Item. NOTE This must come before routes that display Category (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating an Item.
router.post('/item/create', item_controller.item_create_post);

// GET request for deleting an Item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request for deleting an Item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request for updating an Item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request for updating an Item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one Item.
router.get('/item/:id', item_controller.item_details);


/// ITEM INSTANCES ROUTES ///

// GET request for creating an Item Instance. NOTE This must come before route that displays Item Instance (uses id).
router.get('/iteminstance/create', item_instance_controller.iteminstance_create_post);

//POST request for creating an Item Instance.
router.post('/iteminstance/create', item_instance_controller.iteminstance_create_post);

// GET request to delete an Item Instance.
router.get('/iteminstance/:id/delete', item_instance_controller.iteminstance_delete_get);

// POST request to delete an Item Instance.
router.post('/iteminstance/:id/delete', item_instance_controller.iteminstance_delete_post);

// GET request to update an Item Instance.
router.get('/iteminstance/:id/update', item_instance_controller.iteminstance_update_get);

// POST request to update an Item Instance.
router.post('/iteminstance/:id/update', item_instance_controller.iteminstance_update_post);

// GET request for one Item Instance.
router.get('/iteminstance/:id', item_instance_controller.iteminstance_details);


module.exports = router;
