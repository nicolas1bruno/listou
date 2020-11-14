const Item = require('../../models/item');

module.exports = {
    create : async (pItens, nfce_id) => {
        try {
            pItens.forEach(item => {
                item.NFCe = nfce_id,
                item.qtd = item.qtd.replace(',', '.'),
                item.vlUnit = item.vlUnit.replace(',', '.'),
                item.vlTotal = item.vlTotal.replace(',', '.')
            });
            
            const itens = await Item.create(pItens);
            
            return itens;
        } catch (error) {
            throw "Erro criando itens da NFC-e\n" + error;
        }
    }
}