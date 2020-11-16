const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NFCeSchema = new Schema({
    numero: {
        type: mongoose.Number,
        required: true
    },
    serie: {
        type: mongoose.Number,
        required: true
    },
    chave: {
        type: String, 
        required: true
    },
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