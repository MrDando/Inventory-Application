var mongoose = require('mongoose');

var ItemInstanceSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    size: { type: String, maxLength: 20 },
    color: { type: String },
    stock: { type: Number }
});

// Virtual for category's URL
ItemInstanceSchema
    .virtual('url')
    .get(function() {
        return '/iteminstance' + this._id;
    });

//Export model
module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);