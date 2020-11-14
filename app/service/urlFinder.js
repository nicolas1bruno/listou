const Fetcher = require('./Fetcher');
const HTMLParser = require('node-html-parser');

const rsFind = async (url) => {
    const html = await Fetcher.fetch(url);
    let root = HTMLParser.parse(html);
    let iframe = root.querySelector("iframe");
    
    return iframe.attributes.src;
}

module.exports["RS"] = rsFind;
//module.exports["SC"] = scFind;