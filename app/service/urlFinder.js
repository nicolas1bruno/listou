const Fetcher = require('./Fetcher');
const HTMLParser = require('node-html-parser');

const rsFind = (url) => new Promise((resolve, reject) => {
    Fetcher.fetch(url)
        .then(html => {
            let root = HTMLParser.parse(html);
            let iframe = root.querySelector("iframe");
            
            let src = iframe.attributes.src;
            
            resolve(src);
        })
        .catch(reject)
})

module.exports["RS"] = rsFind;
//module.exports["SC"] = scFind;