const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

let UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique:true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    NFCes : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'NFCe' }
    ]
});

UserSchema.pre('save', async function(next){
    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }

    next();
});

UserSchema.pre('findOneAndUpdate', async function(next){
    if(this._update.password != undefined){
        const hash = await bcrypt.hash(this._update.password, 10);
        this._update.password = hash;
    }
    next();
});


module.exports = mongoose.model('User', UserSchema);