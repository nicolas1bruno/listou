//const App = require('../../models/app');
const HtmlReader = require('../../service/HtmlReader');
const URLFinder = require('../../service/urlFinder');
const Fetcher = require('../../service/Fetcher');
const EmitenteController = require('../emitente/emitente');
const ItemController = require('../item/item');
const User = require('../../models/user');
const NFCe = require('../../models/NFCe');

module.exports = {
    new : async (req, res) => {
        const { userId } = req;
        const { url } = req.body;

        //console.log("userId : " + userId);
        
        const consumidor = await User.findById(userId);
        //console.log("consumidor : " + consumidor);

        try {
            let decodedNFCe = await decode(url);
            //console.log("decodedNFCe: " + decodedNFCe);

            const emitente = await EmitenteController.create(decodedNFCe.emitente);                    
            //console.log(emitente);

            if (!consumidor.fornecedores.includes(emitente._id)) {
                consumidor.fornecedores.push(emitente);
                consumidor.save();
            }
            
            const nfce = await NFCe.create({
                emitente: emitente,
                consumidor: consumidor
            });
            //console.log('nfce: ' + nfce);
            
            const itens = await ItemController.create(decodedNFCe.itens, nfce._id);
            
            itens.forEach(item => {
                nfce.itens.push(item._id);
            });
            
            nfce.save();
            
            res.status(200).send(nfce);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);    
        }
    }
}

const decode = async (url) => {
    //Identificar o estatdo de origem
    let source = extractSource(url);
    
    //Encontrar URL final do HTML a ser lido
    let finalUrl = await findFinalURL(url, source);

    //Buscar HTML final
    let htmlNFCe = await Fetcher.fetch(finalUrl);
    
    //Ler HTML e retornar a NFCe
    return htmlToNFCe(htmlNFCe, source);
}

const findFinalURL = async (url, type) => {
    return await URLFinder[type](url);
}

function htmlToNFCe(html, type) {
    return HtmlReader[type](html);
}

function extractSource(url) {
    return "RS";
}