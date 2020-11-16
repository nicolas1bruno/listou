const Item = require('../../models/item');

module.exports = {
    create : async (pItens, nfce_id) => {
        try {
            pItens.forEach(item => {
                item.NFCe = nfce_id,
                item.qtd = item.qtd,
                item.vlUnit = item.vlUnit,
                item.vlTotal = item.vlTotal
            });
            
            const itens = await Item.create(pItens);
            
            return itens;
        } catch (error) {
            throw "Erro criando itens da NFC-e\n" + error;
        }
    }
}