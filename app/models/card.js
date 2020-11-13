const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardSchema = new Schema({
    cardNumber: {
        type: String, 
        required: true
    },
    expirationMonth: {
        type: Number, 
        required: true
    },
    expirationYear: {
        type: Number, 
        required: true
    },
    cvv: {
        type: Number, 
        required: true
    },
    document: {
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Card', CardSchema);