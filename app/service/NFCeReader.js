const HTMLParser = require('node-html-parser');

function rsRead(html) {
    let nfce = {};
    
    const root = HTMLParser.parse(html);
    
    //Identificador das seções
    let tables = root.querySelectorAll(".NFCCabecalho")
    
    //Dados do emitente
    let dadosEmitente = tables[0];
    let camposDadosEmitente = dadosEmitente.querySelectorAll("td");

    let cnpj_ie = camposDadosEmitente[2].rawText;
    cnpj_ie = cnpj_ie.replace(/\D+/gm, '');    

    let emitente = {
        nome: camposDadosEmitente[1].rawText,
        cnpj: cnpj_ie.substr(0, 14),
        ie: cnpj_ie.substr(14),
    };

    //Dados de endereço do emitente
    let endereco = tables[1];    
    endereco = endereco.querySelectorAll("td");

    endereco = endereco[0].rawText;
    endereco = endereco.replace(/\n +/gm, '');
    endereco = endereco.split(',');
    console.log(endereco);

    emitente.endereco = {
        logradouro: endereco[0],
        numero: endereco[1],
        bairro: endereco[2],
        cidade: endereco[3],
        estado: endereco[4],
    }

    //Produtos da NFCe
    let tableItems = tables[3];
    
    let rows = tableItems.querySelectorAll("tr")

    let itens = [];

    for (let index = 1; index < rows.length; index++) {
        let row = rows[index];
        
        let columns = row.querySelectorAll("td");

        let values = [];

        columns.forEach(column => {
            values.push(column.rawText);
        });

        let item = {
            codigo: values[0],
            descricao: values[1],
            qtd: values[2],
            un: values[3],
            vlUnit: values[4],
            vlTotal: values[5],
        }

        itens.push(item);
    }
    
    nfce.emitente = emitente;
    nfce.itens = itens;

    return nfce;
}

function scRead(html) {
    
}

module.exports["RS"] = rsRead;
module.exports["SC"] = scRead;