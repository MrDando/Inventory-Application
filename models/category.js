var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: { type: String, required: true,  maxLength: 100},
    description: { type: String },
});

// Virtual for category's URL
CategorySchema
    .virtual('url')
    .get(function() {
        return '/category' + this._id;
    });

//Export model
module.exports = mongoose.model('Category', CategorySchema);