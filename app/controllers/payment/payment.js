const Payment = require('../../models/payment');
const Rent = require('../../models/rent');
const Billet = require('../../models/billet');

module.exports = {
    payWithCard : async (req, res) =>{
        try {
            const { cardId, rentId } = req.body;
        
            let value = await getValue(rentId);

            const payment = await Payment.create({
                card: cardId, 
                rent: rentId,
                value: value,
                isPaidOut:true
            })

            let rent = await Rent.findById(rentId);
            rent.payment = payment._id;
            await rent.save();

            return res.send(convertToResponse(payment, true))
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error paying with card"});
        }        
    },

    payWithBillet : async (req, res) =>{
        try {
            const { rentId } = req.body;
        
            let value = await getValue(rentId);
            
            const currentDate = new Date()
            const dueDate = new Date()
            dueDate.setDate(currentDate.getDate()+2)
            
            let billet = await Billet.create({
                code:"34191790010104351004791020150008282930026000",
                dueDate:dueDate,
                url:`http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Microhouse+Inform%E1tica+S%2FC+Ltda&data_documento=${currentDate.getDate()}%2F${currentDate.getMonth()}%2F${currentDate.getFullYear()}&numero_documento=DF+00113&especie=&aceite=N&data_processamento=${currentDate.getDate()}%2F${currentDate.getMonth()}%2F${currentDate.getFullYear()}&uso_banco=&carteira=179&especie_moeda=Real&quantidade=&valor=&vencimento=${dueDate.getDate()}%2F${dueDate.getMonth()}%2F${dueDate.getFullYear()}&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=${value}%2C00&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%24+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar`
            })

            const payment = await Payment.create({
                rent: rentId,
                value: value,
                billet: billet
            })

            let rent = await Rent.findById(rentId);
            rent.payment = payment._id;
            await rent.save();

            return res.send(convertToResponse(payment, false))
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error paying with billet"});
        }
    },

    findPaymentById: async (req, res) => {        
        try {
            const { id } = req.params;
        
            const payment = await Payment.findById(id);
            
            return res.send({
                id: payment._id,
                isPaidOut: payment.isPaidOut,
                value: parseFloat(payment.value),
                card: payment.card,
                billet: payment.billet        
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting payment"});
        }
    }
}


let getValue = async (rentId) => {
    const rent = await Rent.findById(rentId);
    
    return parseFloat(rent.totalAmount.toString());
}


let convertToResponse = (payment, card) => {
    return {
        id: payment._id,
        message: card ? 'Pagamento realizado com sucesso!' : 'Pagamento aguardando confirmação.',
        cardId: payment.card,
        billetId:  payment.billet
    
    }
}