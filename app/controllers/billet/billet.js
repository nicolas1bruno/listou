const Billet = require('../../models/billet');

module.exports = {
    create : async (req, res) =>{
        try {
            const { code, dueDate, url } = req.body;
        
            const billet = await Billet.create({
                code, 
                dueDate, 
                url
            })

            return res.send(convertToResponse(billet))
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating billet"});
        }
    },

    find : async (req, res) => {
        try {
            const billets = await Billet.find()
        
            let response = [];

            billets.forEach(billet => {
                response.push(convertToResponse(billet))
            });

            return res.send(response)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting billets"});
        }        
    },

    findById : async (req, res) => {
        try {
            const { id } = req.params;
        
            const billet = await Billet.findById(id);
 
            res.send(convertToResponse(billet));
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting billets"});
        }
    }    
}

let convertToResponse = (billet) => {
    return {
        id: billet._id,
        code: billet.code, 
        dueDate: billet.dueDate, 
        url: billet.url
    };
}