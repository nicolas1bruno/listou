const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PaymentSchema = new Schema({
    isPaidOut: {
        type: Boolean
    },
    value: {
        type: mongoose.Decimal128,
        required: true
    },
    rent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },
    billet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billet'
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);