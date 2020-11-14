const Emitente = require('../../models/emitente');
const User = require('../../models/user');

let create = async (pEmitente) => {
    try {
        const { cnpj } = pEmitente;
        
        let emitente = await Emitente.findOne({ cnpj: cnpj }).exec();
        
        if (!emitente) {
            emitente = await Emitente.create(pEmitente);
        }
        
        return emitente;    
    } catch (error) {
        throw "Error creating emitente\n" + error;
    }
}

module.exports = {
    create
}