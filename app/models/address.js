const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

let AddressSchema = new Schema({
    cep:{
        type: Number,
        required:true,
    },
    address:{
        type: String, 
        required: true,
        lowercase:true
    },
    number:{
        type: Number,
        required:true,
    },
    residentialComplement:{
        type: Number,
    },
    neighborhood:{
        type: String,
        required:true,
    },
    city:{
        type: String,
        required:true,
    },
    uf:{
        type: String,
        required:true,
        max: 2
    },
    latitude:{
        type: Number,
        required:false,
    },
    longitude:{
        type: Number,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        select:false,
    }
});

module.exports = mongoose.model('Address', AddressSchema);
