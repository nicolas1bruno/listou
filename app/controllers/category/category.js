const Category = require('../../models/category');

module.exports = {
    create : async (req, res) =>{
        try {
            const { userId } = req;
            const { description } = req.body;
            
            const category = await Category.create({
                description: description,
                user: userId
            })

            return res.send(category)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating category"});
        }
    },

    find : async (req, res) => {
        try {
            const { userId } = req;

            const categories = await Category.find({user: userId}).exec();
            return res.send(categories)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting categories"});
        }
    }
}