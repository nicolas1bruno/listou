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
                    vlTotal : item.vlTotal,

                    user: nfce.consumidor
                });
            });
            
            const itens = await Item.create(newItens);
            
            const existingProducts = await Product.find({_id : { $in : productIds} }).exec();
            
            itens.forEach(item => {
                if (item.product) {
                    existingProducts.forEach((product) => {
                        if(String(product._id) == String(item.product)) {
                            product.items.push(item);
                            product.save();
                        }
                    });
                }
            });

            return itens;
        } catch (error) {
            throw "Erro criando itens da NFC-e\n" + error;
        }
    },

    update : async (req, res) => {
        try {
            const { userId } = req;
        
            const { itemId, productId } = req.body;

            const item = await Item.findOne({_id: itemId, user: userId}).exec();
            if (!item) {
                return res.status(400).send({ message: "Item not found", error: "Item not found"});
            }
            
            const product = await Product.findOne({_id: productId, user: userId}).exec();
            if (!product) {
                return res.status(400).send({ message: "Product not found", error: "Product not found"});
            }

            if (String(item.product) == String(productId)) {
                return res.status(200).send({message: "Same product"});
            }
            
            if (item.product) {
                const oldProduct = await Product.findById(item.product);
                oldProduct.items = oldProduct.items.filter(function(value, index, arr) { 
                    return String(value) != itemId;
                });
                oldProduct.save();
            }

            item.product = product;
            item.save();

            // Add item to product
            product.items.push(item);

            // Search for other items in the same condition
            let otherItems = await Item.find({codigo: item.codigo, emitente: item.emitente, product: null, user: userId })
            
            otherItems.forEach(oItem => {
                oItem.product = product;
                oItem.save();
                // Add itens to product
                product.items.push(oItem);
            });
            
            // Update product
            product.save();

            return res.status(200).send({message: "Updated"});
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error updating item", error: error});
        }
    }
}