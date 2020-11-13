const Car = require('../../models/car');
const App = require('../../models/app');
const Rent = require('../../models/rent');

const AsyncUtils = require('../../../utils-module').Async;
const FiltterBuilderUtils = require('../../../utils-module').FiltterBuilder;

module.exports = {
    create : async (req, res) => {
        try {
            const { 
                name, apps, brand, model, manufactureYear, modelYear, cost, luggages, airConditioner, passengers,
                description, airBag, abs, kilometrage, board, currentRentalCompany, rentalCompanies, image, security, 
                adminTax, color
            } = req.body;
            
            const car = await Car.create({
                name,
                apps,
                brand,
                model,
                manufactureYear,
                modelYear,
                cost, 
                luggages, 
                airConditioner, 
                passengers,
                description, 
                airBag, 
                abs,
                kilometrage,
                board,
                currentRentalCompany,
                rentalCompanies,
                image,
                security, 
                adminTax, 
                color
            })
            
            if(apps) {
                AsyncUtils.asyncForEach(apps, async (appId) => {
                    //add Car to App
                    const app = await App.findById(appId);
                    app.cars.push(car);
                    await app.save();
                });
            }            
            
            const populatedCar = 
                await Car.find({_id: car._id})
                    .populate("brand", 'name')
                    .populate("model", 'name')
                    .populate("apps", 'name')
                    .populate("currentRentalCompany", 'name')
                    .populate("rentalCompanies", 'name');
    
            return res.send(populatedCar)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error creating car", error: error});
        }
    },

    list : async (req, res) => {
        try {
            const cars = await Car.find()
                .populate("brand", 'name')
                .populate("model", 'name')
                .populate("apps", 'name')
                .populate("currentRentalCompany", 'name')
                .populate("rentalCompanies", 'name');
            
            let response = [];
            
            cars.forEach(car => {
                response.push(convertToResponse(car))
            });

            return res.send({cars: response})
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting cars"});
        }
    },

    getCar : async (req, res) => {
        try {
            const { id } = req.params;

            const car = await Car.findById(id)
                .populate("brand", 'name')
                .populate("model", 'name')
                .populate("apps", 'name')
                .populate("currentRentalCompany", 'name')
                .populate("rentalCompanies", 'name');

            res.send(convertToResponse(car));
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error getting car"});
        }
    },

    search : async (req, res) => {
        try {
            const { 
                name, apps, brand, model, manufactureYear, modelYear, cost, luggages, 
                airConditioner, passengers, airBag, abs, rentalCompanyPickup, rentalCompanyDelivery, isAplicationCar, 
                datePickup, dateDelivery, kilometrage, security, adminTax, color
            } = req.body;
    
            let filtters = {};
            
            //simple filtter
            if (name) { filtters.name = name}
            if (brand) { filtters.brand = brand}
            if (model) { filtters.model = model}
            if (luggages) { filtters.luggages = luggages}
            if (airConditioner) { filtters.airConditioner = airConditioner}
            if (airBag) { filtters.airBag = airBag}
            if (abs) { filtters.abs = abs}
            if (color) { filtters.color = color}
            
            //complex locatio filtters
            if (rentalCompanyPickup) { filtters.currentRentalCompany = rentalCompanyPickup}
            if (rentalCompanyDelivery) { filtters.rentalCompanies = { $in: [rentalCompanyDelivery] } }

            //complex apps filtter
            if (apps) { filtters.apps = { $in: apps } }
            if (isAplicationCar) {                        
                let appIds = [];
    
                const apps = await App.find()
                apps.forEach(app => {
                    appIds.push(app._id);
                });
    
                filtters.apps = { $in: appIds }
            }
            
            //complex data filtter
            if(datePickup && dateDelivery) {
                let rentFiltters = [];
                
                rentFiltters.push({
                    datePickup: {
                        $gte: datePickup,
                        $lte: dateDelivery
                    }
                })
    
                rentFiltters.push({
                    dateDelivery: {
                        $gte: datePickup,
                        $lte: dateDelivery
                    }
                })
                
                let rentedCards = [];
    
                const rents = await Rent.find({$or: rentFiltters})
                
                rents.forEach(rent => {
                    rentedCards.push(rent.car);
                });
                
                
                if (rentedCards.length > 0) {
                    filtters._id = { $nin: rentedCards }
                }
            }
    
            //complex filtter
            if (manufactureYear) { filtters = FiltterBuilderUtils.build(manufactureYear, filtters, "manufactureYear") }
            if (modelYear) { filtters = FiltterBuilderUtils.build(modelYear, filtters, "modelYear") }
            if (cost) { filtters = FiltterBuilderUtils.build(cost, filtters, "cost") }
            if (passengers) { filtters = FiltterBuilderUtils.build(passengers, filtters, "passengers") }
            if (kilometrage) { filtters = FiltterBuilderUtils.build(kilometrage, filtters, "kilometrage") }
            if (security) { filtters = FiltterBuilderUtils.build(security, filtters, "security") }
            if (adminTax) { filtters = FiltterBuilderUtils.build(adminTax, filtters, "adminTax") }
            
            let cars = [];
            
            cars = await Car.find(filtters)
                .populate("brand", 'name')
                .populate("model", 'name')
                .populate("apps", 'name')
                .populate("currentRentalCompany", 'name')
                .populate("rentalCompanies", 'name');            
            let response = [];
            
            cars.forEach(car => {
                response.push(convertToResponse(car))
            });
    
            return res.send({cars: response})
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Error searching cars", error: error});
        }
    }
}

let convertToResponse = (car) => {
    let currentRentalCompany = undefined;
    let rentalCompanies = [];
    let apps = [];

    if(car.currentRentalCompany) {
        currentRentalCompany = {
            id: car.currentRentalCompany._id,
            name: car.currentRentalCompany.name,
        }
    }

    if(car.rentalCompanies) {
        car.rentalCompanies.forEach(company => {
            rentalCompanies.push({
                id: company._id,
                name: company.name
            })
        });
    }

    if(car.apps) {
        car.apps.forEach(app => {
            apps.push(app.name)
        });
    }

    return {
        id: car._id,
        image: car.image, 
        description: car.description, 
        brand: (car.brand) ? car.brand.name : '', 
        model: (car.model) ? car.model.name : '', 
        modelYear: car.modelYear, 
        manufactureYear: car.manufactureYear, 
        cost: (car.cost) ? car.cost.toString() : 0, 
        security: (car.security) ? car.security.toString() : 0, 
        adminTax: (car.adminTax) ? car.adminTax.toString() : 0, 
        luggages: car.luggages,
        airConditioner: car.airConditioner,
        passengers: car.passengers,
        airBag: car.airBag,
        abs: car.abs,
        board: car.board,
        currentRentalCompany: currentRentalCompany,
        rentalCompanies: rentalCompanies,
        kilometrage: car.kilometrage,
        color: car.color,
        apps: apps
    };
}