var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: { type: String, required: true,  maxLength: 100},
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
});

// Virtual for category's URL
ItemSchema
    .virtual('url')
    .get(function() {
        return '/item/' + this._id;
    });

//Export model
module.exports = mongoose.model('Item', ItemSchema);