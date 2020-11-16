const Item = require('../../models/item');
const Product = require('../../models/product');

module.exports = {
    create : async (nfce, decodedNFCe) => {
        try {
            let codes = [];
            decodedNFCe.itens.forEach(item => {
                codes.push(item.codigo)
            });

            const existingItems = await Item.find({
                codigo : { $in : codes},
                emitente: nfce.emitente._id,
                product : { $ne : null }
            })
            .exec();
            
            let productIds = [];

            let codeMap = new Map();
            existingItems.forEach(item => {
                codeMap.set(item.codigo, item.product);
                productIds.push(item.product);
            });

            let newItens = [];
            decodedNFCe.itens.forEach(item => {
                newItens.push({
                    NFCe : nfce._id,
                    emitente : nfce.emitente._id,
                    product : codeMap.get(item.codigo),
                    
                    codigo : item.codigo,
                    descricao : item.descricao,
                    qtd : item.qtd,
                    un : item.un,
                    vlUnit : item.vlUnit,
                    vlTotal : item.vlTotal
                });
            });
            
            const itens = await Item.create(newItens);
            
            const existingProducts = await Product.find({_id : { $in : productIds} }).exec();
            
            itens.forEach(item => {
                if (item.product) {
                    existingProducts.forEach((product) => {
                        if(String(product._id) == String(item.product)) {
                            product.items.push(item);
                        }
                    });
                }
            });

            Product.updateMany(existingProducts);
            //existingProducts.save();
            
            return itens;
        } catch (error) {
            throw "Erro criando itens da NFC-e\n" + error;
        }
    }
}