const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BilletSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    dueDate: {
        type:Date,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Billet', BilletSchema);