const Card = require('../../models/card');
const User = require('../../models/user');

let validate = async (data) => {

    const { holderBirthDate, cardNumber, expirationMonth, expirationYear, document, cvv } = data;
    
    let errors = {}

    if(holderBirthDate == "" || holderBirthDate == undefined){
        errors["holderBirthDate"]="Empty holderBirthDate"
    }

    if(cardNumber == "" || cardNumber == undefined){
        errors["cardNumber"]="Empty cardNumber"
    }

    if(expirationMonth == "" || expirationMonth == undefined){
        errors["expirationMonth"]="Empty expirationMonth"
    }

    if(expirationMonth == "" || expirationMonth == undefined){
        errors["expirationYear"]="Empty expirationYear"
    }

    if(expirationYear == "" || expirationYear == undefined){
        errors["expirationYear"]="Empty expirationYear"
    }

    if(document == "" || document == undefined){
        errors["document"]="Empty document"
    }

    if(cvv == "" || cvv == undefined){
        errors["cvv"]="Empty cvv"
    }

    return { errors }

}

let create  = async (req, res) =>{

    const cardErrors = await validate(req.body)

    if(Object.keys(cardErrors.errors).length > 0)
        return res.status(406).send({
            errors:cardErrors.errors, 
            message:"Error create card"            
        })


    try {
        const { userId } = req;
    
        const { cardNumber, expirationMonth, expirationYear, document, cvv } = req.body;
        
        const card = await Card.create({
            cardNumber, 
            expirationMonth, 
            expirationYear, 
            document,
            cvv,
            userId
        });

        const relatedUser = await User.findById(userId);
        
        if(relatedUser) {
            relatedUser.cards.push(card);
            await relatedUser.save();
        }

        return res.send({id: card._id, cardNumber: card.cardNumber});
    } catch (error) {
        res.status(500).send({message: "Error creating card"});
    }
}

let findCardsByUser = async (req, res) => {
    try {
        const { userId } = req;
    
        const relatedUser = await User.findById(userId)
            .populate('cards');

        let cards = [];
        relatedUser.cards.forEach(card => {
            cards.push({id: card._id, cardNumber: card.cardNumber})    
        });

        res.send({cards: cards});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error getting cards"});
    }
}

let findCardById  =  async (req, res) => {
    try {
        const { id } = req.params;
    
        const card = await Card.findById(id);
        
        return res.send({id: card._id, cardNumber: card.cardNumber});    
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error getting card"});
    }
}

module.exports = {
    validate,
    create,
    findCardsByUser,
    findCardById
}