const axios = require('axios');

const fetch = async (url) => {
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw "Error fetching URL\n" + url + "\n" + error;
    }
}

/*
const fetch = (url) => new Promise((resolve, reject) => {
    

    const response = await axios.get('url');
    https.get(
        url,
        res => {
            const dataBuffers = []
            res.on('data', data => dataBuffers.push(data.toString('utf8')))
            res.on('end', () => resolve(dataBuffers.join('')))
        }
    ).on('error', reject)
})
*/

module.exports = {
    fetch
}