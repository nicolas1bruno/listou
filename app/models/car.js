const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true
    },
    manufactureYear: {
        type: Number,
        required: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    cost: {
        type: mongoose.Decimal128,
        required: true
    },
    security: {
        type: mongoose.Decimal128,
        required: true
    },
    adminTax: {
        type: mongoose.Decimal128,
        required: true
    },
    luggages: {
        type: Number,
        required: true
    },
    airConditioner: {
        type: Boolean,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    airBag: {
        type: Boolean,
        required: true
    },
    abs: {
        type: Boolean,
        required: true
    },
    kilometrage: {
        type: Number
    },
    board: {
        type: String
    },
    color: {
        type: String,
        required: true
    },
    currentRentalCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentalCompany'
    },
    rentalCompanies : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'RentalCompany'
        }
    ],
    apps : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'App'
        }
    ],
    rents : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Rent'
        }
    ]
});


// Export the model
module.exports = mongoose.model('Car', CarSchema);