var Category = require('../models/category')

exports.get_category_list = function(callback) {
    Category.find({}, 'name')
    .sort([['name', 'ascending']])
    .exec(callback)
  }