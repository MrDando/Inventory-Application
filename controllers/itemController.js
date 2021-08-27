var Item = require('../models/item');
var ItemInstance = require('../models/itemInstance')

var async = require('async')

var CL = require('./categoryList')

// Display details of specific item
exports.item_details = function(req, res, next) {
    
    async.parallel({
        category_list: CL.get_category_list,
        item: function(callback) {
            Item.findById(req.params.id)
            .exec(callback)
        },
        item_instances: function(callback) {
            ItemInstance.find({'item': req.params.id})
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.item == null) {
            // No Results
            let err = new Error('Item not found')
            err.status = 404;
            return next(err)
        }

        // Checks if all item instances size properties are numbers
        function sizeIsNumber(itemInst) {
            return !isNaN(parseInt(itemInst.size))
        }

        // If all size properties are numbers sort array by size
        if (results.item_instances.every(sizeIsNumber)) {
            results.item_instances.sort(function(a,b) {
                return a.size - b.size
            })
        }
        res.render('item_details', { title: `Item: ${results.item.name}`, item: results.item, itemInstanceList: results.item_instances, category_list: results.category_list})
    })
    
}

// Display form for creating a new Item
exports.item_create_get = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Handle form data to create a new Item
exports.item_create_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Display form for deleting an existing Item
exports.item_delete_get = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Handle form data to delete an existing Item
exports.item_delete_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Display form for updating an existing Item
exports.item_update_get = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Handle form data to update an existing Item
exports.item_update_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}