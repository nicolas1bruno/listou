const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RentSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    datePickup: {
        type: Date,
        required: true
    },
    dateDelivery: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: mongoose.Decimal128,
        required: true
    },
    rentalCompanyPickup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentalCompany'
    },
    rentalCompanyDelivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentalCompany'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }    
});

module.exports = mongoose.model('Rent', RentSchema);