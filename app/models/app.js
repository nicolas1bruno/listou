const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AppSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    cars : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Car'
        }
    ]
});

module.exports = mongoose.model('App', AppSchema);