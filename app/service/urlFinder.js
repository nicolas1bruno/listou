const Fetcher = require('./Fetcher');
const HTMLParser = require('node-html-parser');

const rsFind = async (url) => {
    try {
        const html = await Fetcher.fetch(url);
        
        let root = HTMLParser.parse(html);
        let iframe = root.querySelector("iframe");
        
        if(iframe) {
            return iframe.attributes.src;
        }

        throw "Frame not founded";
    } catch (error) {
        throw "Error gettinh final URL for RS\n" + error;
    }    
}

module.exports["RS"] = rsFind;
//module.exports["SC"] = scFind;