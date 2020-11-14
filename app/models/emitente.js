const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmitenteSchema = new Schema({
    nome: {
        type: String, 
        required: true
    },
    cnpj: {
        type: String, 
        required: true
    },
    ie: {
        type: String, 
        required: true
    },
    logradouro: {
        type: String, 
        required: true
    },
    numero: {
        type: String, 
        required: true
    },
    bairro: {
        type: String, 
        required: true
    },
    cidade: {
        type: String, 
        required: true
    },
    estado: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Emitente', EmitenteSchema);