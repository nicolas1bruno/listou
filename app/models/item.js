const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    codigo: {
        type: String, 
        required: true
    },
    descricao : {
        type: String, 
        required: true
    },
    qtd : {
        type: mongoose.Decimal128,
        required: true
    },
    un : {
        type: String, 
        required: true
    },
    vlUnit : {
        type: mongoose.Decimal128,
        required: true
    },
    vlTotal : {
        type: mongoose.Decimal128,
        required: true
    },
    NFCe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NFCe'
    },
    emitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emitente'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Item', ItemSchema);