const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    description : {
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Product'
        }
    ]
});

module.exports = mongoose.model('Category', CategorySchema);