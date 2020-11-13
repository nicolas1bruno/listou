//const App = require('../../models/app');
const NFCeReader = require('../../service/NFCeReader');
const URLFinder = require('../../service/urlFinder');
const Fetcher = require('../../service/Fetcher');

module.exports = {
    decode : async (req, res) => {
        const { url, userId } = req.body;
        
        let source = extractSource(url);
       
        findFinalURL(url, source)
            .then(url => {
                Fetcher.fetch(url)
                    .then(html => {
                        let nfce = readNFCe(html, source);
                        res.status(200).send(nfce);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }
}

const findFinalURL = (url, type) => new Promise((resolve, reject) => {
    URLFinder[type](url)
        .then(url => {
            resolve(url)
        })
        .catch(reject)
})

function readNFCe(html, type) {
    return NFCeReader[type](html);
}

function extractSource(url) {
    return "RS";
}