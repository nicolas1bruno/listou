const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NFCeSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    itens : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Item'
        }
    ]
});

module.exports = mongoose.model('NFCe', NFCeSchema);