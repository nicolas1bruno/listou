const Rent = require('../../models/rent');
const User = require('../../models/user');
const Car = require('../../models/car');

const AsyncUtils = require('../../../utils-module').Async;

module.exports = {
    create : async (req, res) => {
        try {
            const { userId } = req;
        
            let { rentalCompanyPickupId, rentalCompanyDeliveryId, carId, datePickup, dateDelivery } = req.body;
            
            if (!rentalCompanyDeliveryId) {
                rentalCompanyDeliveryId = rentalCompanyPickupId;
            }

            let totalAmount = await calculate(carId, datePickup, dateDelivery);
            
            const rent = await Rent.create({
                customer: userId,
                rentalCompanyPickup: rentalCompanyPickupId,
                rentalCompanyDelivery: rentalCompanyDeliveryId,
                car: carId,
                datePickup, 
                dateDelivery,
                totalAmount: totalAmount
            });

            await rent.save();

            const relatedUser = await User.findById(userId);
            relatedUser.rents.push(rent);
            await relatedUser.save();

            //add Rent to Car
            const relatedCar = await Car.findById(carId);
            relatedCar.rents.push(rent);
            await relatedCar.save();

            return res.send(convertCreatedToResponse(rent));
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating rent"});
        }
    },

    find : async (req, res) => {
        try {
            const { userId } = req;

            const rents = await Rent.find({customer: userId})
                .populate("car")
                .populate("rentalCompanyPickup")
                .populate("rentalCompanyDelivery")
                .populate("payment")
            
            let response = [];

            await Promise.all(rents.map(async (rent) => {
                let converted = await convertListToResponse(rent);            
                response.push(converted)
            }));
            
            return res.send({rents: response})
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting rents"});
        }
    },

    findById : async (req, res) => {
        try {
            const { id } = req.params;

            const rent = await Rent.findById(id)
                .populate("car")
                .populate("rentalCompanyPickup")
                .populate("rentalCompanyDelivery")
                .populate("payment")
            
            return res.send(await convertListToResponse(rent))
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting rent"});
        }
    },
}

let calculate = async (carId, datePickup, dateDelivery) => {
    const car = await Car.findById(carId);

    datePickup = new Date(datePickup);
    dateDelivery = new Date(dateDelivery);
    
    daysCount = (dateDelivery.getTime() - datePickup.getTime()) / (1000 * 3600 * 24);
    
    //(dias * cost) + (dias * security) + (adminTax)
    let totalAmount = 0;
    
    totalAmount += daysCount * parseFloat(car.cost.toString());
    totalAmount += daysCount * parseFloat(car.security.toString());
    totalAmount += parseFloat(car.adminTax.toString());
    
    return totalAmount;
}

let convertCreatedToResponse = (rent) => {
    return {
        id: rent._id,
        message: 'Reserva efetuada, efetue o pagamento.'
    }
}

let convertListToResponse = async (rent) => {
    let car = undefined;
    let cardId = (rent.car) ? rent.car._id : undefined;
    
    if(cardId) {
        car = await Car.findById(rent.car)
            .populate("model")
    }
    
    return {
        id: rent._id,
        rentalCompanyPickupName: (rent.rentalCompanyPickup) ? rent.rentalCompanyPickup.name : '',
        rentalCompanyPickupId: (rent.rentalCompanyPickup) ? rent.rentalCompanyPickup._id : '',
        rentalCompanyDeliveryName: (rent.rentalCompanyDelivery) ? rent.rentalCompanyDelivery.name : '',
        rentalCompanyDeliveryId: (rent.rentalCompanyDelivery) ? rent.rentalCompanyDelivery._id : '',
        model: (car) ? ((car.model) ? car.model.name : '') : '',
        board: (car) ? car.board : '',
        modelYear: (car) ? car.modelYear : '',
        carId: cardId,
        datePickup: rent.datePickup,
        dateDelivery: rent.dateDelivery,
        paymentId: (rent.payment) ? rent.payment._id : '',
        totalAmount: parseFloat(rent.totalAmount)
    }
}