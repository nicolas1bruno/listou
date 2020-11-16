const Product = require('../../models/product');
const Category = require('../../models/category');

module.exports = {
    create : async (req, res) =>{
        try {
            const { userId } = req;
            const { description, category } = req.body;
            
            const product = await Product.create({
                description: description,
                category: category,
                user: userId
            })

            const relatedCategory = await Category.findById(category).exec();
            relatedCategory.products.push(product);
            relatedCategory.save();
            
            return res.send(product)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating product"});
        }
    },

    find : async (req, res) => {
        try {
            const { userId } = req;

            const products = await Product.find({user: userId}).exec();
            return res.send(products)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting products"});
        }
    }
}