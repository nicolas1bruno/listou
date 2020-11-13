const App = require('../../models/app');

module.exports = {
    create : async (req, res) =>{
        try {
            const { name } = req.body;
            const app = await App.create({
                name
            })

            return res.send(app)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating app"});
        }
    },

    find : async (req, res) => {
        try {
            const app = await App.find()
            return res.send(app)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting apps"});
        }        
    },

    appsByCar : async (req, res) => {
        try {
            const { id } = req.params;
            const car = await App.findById(id).populate('apps');
 
            res.send(car.apps);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting cars"});
        }        
    },    

    test : async (req, res) => {
        const { userId } = req;
        console.log("userId", userId);

        res.send(["The Travellers IT","App","teste"]);
    }   
}