const Brand = require('../../models/brand');

module.exports = {
    create : async (req, res) =>{
        try {
            const { name } = req.body;
            const brand = await Brand.create({
                name
            })

            return res.send(brand)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating brand"});
        }
    },

    find : async (req, res) => {
        try {
            const brand = await Brand.find()
            return res.send(brand)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting brands"});
        }
    },
    
    modelsByBrand : async (req, res) => {
        try {
            const { id } = req.params;
            const brand = await Brand.findById(id).populate('models');

            res.send(brand.models);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting models"});
        }
    }
}