var Category = require('../models/category');
var Item = require('../models/item');
var ItemInstance = require('../models/itemInstance');

var async = require('async');

// Display index page
exports.index = function(req, res, next) {
    
    async.parallel({
        category_list: function(callback) {
            Category.find({}, 'name')
            .sort([['name', 'ascending']])
            .exec(callback)
        },
        item_count: function(callback) {
            Item.countDocuments({}, callback)
        },
        items: function(callback) {
            Item.find(callback)
        },
        item_instances: function(callback) {
            ItemInstance.find()
            .populate('item')
            .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err)}
        if (results.category_list==null) {
            // No Categories are defined
            let err = new Error('No Categories found');
            err.status = 404;
            return next(err);
        }

        var categoryCounts = {}
        for(var i = 0; i < results.category_list.length; i++) {
            categoryCounts[results.category_list[i].name] = {}

            var countItems = 0
            for(var j= 0; j < results.items.length; j++) {
                if (JSON.stringify(results.items[j].category) == JSON.stringify(results.category_list[i]._id)) {
                    countItems += 1;
                }
            }
            categoryCounts[results.category_list[i].name].items = countItems

            var countItemInstances = 0
            for(var l= 0; l < results.item_instances.length; l++) {
                if (JSON.stringify(results.item_instances[l].item.category) == JSON.stringify(results.category_list[i]._id)) {
                    countItemInstances += 1;
                }
            }
            categoryCounts[results.category_list[i].name].itemInstances = countItemInstances
        }

        res.render('index', { title: 'Current Inventory', error: err, data: results, counts: categoryCounts})
    })
};