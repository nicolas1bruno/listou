const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RentalCompanySchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    cellphone: {
        type: Number,
        required:true,
    },
    phone: {
        type: Number
    },
    email: {
        type: String, 
        required: true,
        unique:true,
        lowercase:true,
    },
    address :{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Address',
        required:true,
    }
});

module.exports = mongoose.model('RentalCompany', RentalCompanySchema);