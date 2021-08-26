var Category = require('../models/category');
var Item = require('../models/item')

var async = require('async')

var CL = require('./categoryList')


// Display details of specific category
exports.category_details = function(req, res, next) {

    async.parallel({
        category_list: CL.get_category_list,
        category: function(callback) {
            Category.findById(req.params.id)
            .exec(callback)
        },
        item_list: function(callback) {
            Item.find({ 'category': req.params.id })
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.category == null) {
            // No results
            let err = new Error('Category not found');
            err.status = 404;
            return next(err)
        }
        // Successful, so render
        res.render('category_details', { title: `Category: ${results.category.name}`, item_list: results.item_list, category_list: results.category_list})
    })
}

// Display form for creating a new Category
exports.category_create_get = function(req, res, next) {
    async.parallel({
        category_list: CL.get_category_list,
    }, function(err, results) {
        if (err) { return next(err)}
        res.render('category_form', { title: 'Create a new Category' , category_list: results.category_list})
    })
}

// Handle form data to create a new Category
exports.category_create_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Display form for deleting an existing Category
exports.category_delete_get = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Handle form data to delete an existing Category
exports.category_delete_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Display form for updating an existing Category
exports.category_update_get = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}

// Handle form data to update an existing Category
exports.category_update_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}