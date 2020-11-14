const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NFCeSchema = new Schema({
    emitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emitente'
    },
    consumidor: {
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