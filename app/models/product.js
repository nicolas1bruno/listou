const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    description : {
        type: String, 
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Item'
        }
    ]
});

module.exports = mongoose.model('Product', ProductSchema);