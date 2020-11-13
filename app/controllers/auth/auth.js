const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../../config/auth");
const User = require('../../models/user');
const UserController = require('../user/user');

let validate = async (data) => {
    const {
        email, 
        password
    }  = data

    let errors = {}

    if(email == "" || email == undefined){
        errors["email"]="Empty email"
    }

    if(password == "" || password == undefined){
        errors["password"]="Empty password"
    }

    let user
    
    if((Object.keys(errors).length === 0)){
        user = await User.findOne({email}).select('+password');
        if(!user)
            errors["email"]="User Not found."
    }

    if((Object.keys(errors).length === 0)){
        let passwordIsValid =  await bcrypt.compare(password, user.password);
        if(!passwordIsValid)
            errors["password"]="Invalid Password."
    }

    return { errors, user }
};

let signup = async (req, res) => {

    const data =  req.body

    const errors = await UserController.validate(data)

    if(Object.keys(errors.errors).length > 0)
        return res.status(406).send({
            errors, 
            message:"Error create user"            
        })

    try{

        const user = UserController.create(data)
        
        return res.send({
            user:{
                id:user._id,
                name: user.name,
                email: user.email
            },
            message:"Created user"
        })

    }catch(e){
        return res.status(500).send(e)
    }


};

let signin = async (req, res) => {

    const {errors, user} = await validate(req.body)

    if(!(Object.keys(errors).length === 0))
        return res.status(401).send({
            errors:errors,
            message:"Error when logging in"
        })

    let token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400 // 24 hours
    })

    res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
    })

};

module.exports = {
    signup,
    signin,
    validate
};