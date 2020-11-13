const User = require('../../models/user');

let validate = async (data) => {
    const{ 
        name, 
        email, 
        password 
    } = data

    let errors = {}

    if(name == "" || name == undefined)
        errors["name"]="Empty Name"

    if(email == "" || email == undefined){
        errors["email"]="Empty email"

    }else if(await User.findOne({email})){
        errors["email"]="Email already exists"
    }
    if(password == "" || password == undefined)
        errors["password"]="Empty password"

    return { errors }
}

let create = async (data) => {
    try{
        const{ 
            name, 
            email, 
            password 
        } = data

        const user = await new User({
            name,
            email,
            password
        });

        await user.save();
        
        return user  
    
    }catch(e){
        console.log(e)
        throw { message:"Error create user" }
    } 
}

module.exports = {
    create,
    validate
};