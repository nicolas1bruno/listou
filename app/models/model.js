const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModelSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        max: 100
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }
});

module.exports = mongoose.model('Model', ModelSchema);