var Category = require('../models/category');
var Item = require('../models/item')

var async = require('async')
const { body,validationResult } = require("express-validator");

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
        res.render('category_details', { title: `Category: ${results.category.name}`, item_list: results.item_list, category: results.category, category_list: results.category_list})
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
exports.category_create_post = [
    body('name', 'Category name required').trim().isLength({min: 1}).escape(),
    body('description').trim().escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a category object with escaped and trimmed data.
        var category = new Category(
            {   name: req.body.name,
                description: req.body.description
             });

        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            console.log('errors detected')
            async.parallel({
                category_list: CL.get_category_list,
            }, function(err, results) {
                if(err) { return next(err)}

                res.render('category_form', { title: 'Create a new Category' , category_list: results.category_list, category: category, errors: errors.array() })
            })
        } else {
            // Data form is valid. Save category.
            category.save(function(err) {
                if(err) { return next(err) }
                // Sucessful - redirect to the new category page
                res.redirect(category.url)
            })
        }
    }
]

// Display form for deleting an existing Category
exports.category_delete_get = function(req, res, next) {
    
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
    }, function (err, results) {
        if (err) { return next(err) }
        if (results.category==null) {
            let err = new Error('Category not found')
            err.status = 404;
            return next(err)
        }
        res.render('category_delete', { title: `Delete category: ${results.category.name}`, category: results.category, category_list: results.category_list, itemList: results.item_list})
    })
}

// Handle form data to delete an existing Category
exports.category_delete_post = function(req, res, next) {
    async.parallel({
        category_list: CL.get_category_list,
        category: function(callback) {
            Category.findById(req.body.categoryid)
            .exec(callback)
        },
        item_list: function(callback) {
            Item.find({ 'category': req.body.id })
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(results) }
        if (results.item_list.length > 0 ) {
            // Category has Items. Render again.
            res.render('category_delete', { title: `Delete category: ${results.category.name}`, category: results.category, category_list: results.category_list, itemList: results.item_list})
        } else {
            // Category has no Items. Delete the category and redirect to index.
            Category.findByIdAndRemove(req.body.categoryid, function deleteCategory(err) {
                if (err) { return next(err) }
                // Success. Redirect to homepage
                res.redirect('/')
            })
        }
    })
}

// Display form for updating an existing Category
exports.category_update_get = function(req, res, next) {
    
    async.parallel({
        category_list: CL.get_category_list,
        category: function(callback) {
            Category.findById(req.params.id)
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.category==null) {
            // Category not found
            let err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('category_form', { title: 'Update a vCategory' , category: results.category, category_list: results.category_list})
    })
}

// Handle form data to update an existing Category
exports.category_update_post = function(req, res) {
    res.send('PAGE NOT IMPLEMENTED')
}