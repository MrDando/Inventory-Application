#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Item = require('./models/item')
var ItemInstance = require('./models/itemInstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var items = []
var iteminstances = []

function categoryCreate(name, description, cb) {
  var categorydetail = { name: name }
  if (description != false) categorydetail.description = description

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category ' + category)
    categories.push(category)
    cb(null, category)
  })
}

function itemCreate(name, description, category, price, cb) {
  var itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price
  }

  var item = new Item(itemdetail);
  item.save(function(err) {
    if (err) {
      console.log('ERROR CREATING Item: ' + item);
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  });
}

function itemInstanceCreate(item, size, color, stock, cb) {
  var itemInstanceDetail = {
    item: item,
    size: size,
    color: color,
    stock: stock
  }

  var itemInstance = new ItemInstance(itemInstanceDetail);
  itemInstance.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item Instance: ' + itemInstance);
    iteminstances.push(itemInstance);
    cb(null, itemInstance);
  });
}

function createCategories(cb) {
  async.series([
    function(callback) {
      categoryCreate('Shoes', 'The thingies that you wear at your feet', callback)
    },
    function(callback) {
      categoryCreate('Jackets', false, callback)
    },
    function(callback) {
      categoryCreate('Hats', 'The thingies that keep your head warm', callback)
    },
  ],
  cb);
}

function createItems(cb) {
  async.parallel([
    function(callback) {
      itemCreate('Scarpa Mescalito', 'Male low hiking boots', categories[0], 200, callback)
    },
    function(callback) {
      itemCreate('Sherpa Sabi', 'A hat', categories[2], 40, callback)
    },
    function(callback) {
      itemCreate('Dynafit Feline SL', 'Low hiking and running shoes', categories[0], 175, callback)
    },
  ],
  cb)
}

function createItemInstances(cb) {
  async.parallel([
    function(callback) {
      itemInstanceCreate(items[0], 44, 'Titanium/Orange', 5, callback)
    },
    function(callback) {
      itemInstanceCreate(items[0], 43, 'Titanium/Orange', 3, callback)
    },
    function(callback) {
      itemInstanceCreate(items[0], 46, 'Titanium/Orange', 1, callback)
    },
    function(callback) {
      itemInstanceCreate(items[1], false, 'Potala Red', 7, callback)
    },
    function(callback) {
      itemInstanceCreate(items[2], 43, 'Asphalt', 3, callback)
    },
    function(callback) {
      itemInstanceCreate(items[2], 44, 'Asphalt', 6, callback)
    },
    function(callback) {
      itemInstanceCreate(items[2], 44, 'Blue/Orange', 4, callback)
    },

  ],
  cb)
}

async.series([
  createCategories,
  createItems,
  createItemInstances
],
//Optional callback
function(err, results) {
  if (err) {
    console.log('FINAL ERR: ' +err)
  } else {
    console.log('TEST' + results)
  }
  // All done, disconnect from database
  mongoose.connection.close();
})