const UserInfo = require('../../models/userInfo');

let validate = async (data) => {

    const{
        cpf,
        rg,
        cellphone,
        phone,
        cnhNumber,
        cnhExpirationDate,
        cnhCategory,

    } = data

    let errors = {}

    if(cpf == "" || cpf == undefined){
        errors["cpf"]="Empty cpf"
    }else if(await UserInfo.findOne({cpf})){
        errors["cpf"]="Cpf already exists"
    }

    if(rg == "" || rg == undefined)
        errors["rg"]="Empty rg"

    if(cellphone == "" || cellphone == undefined)
        errors["cellphone"]="Empty cellphone"

    if(cnhNumber == "" || cnhNumber == undefined){
        errors["cnhNumber"]="Empty cnhNumber"
    }else if(await UserInfo.findOne({cnhNumber})){
        errors["cnhNumber"]="CnhNumber already exists"
    }

    if(cnhExpirationDate == "" || cnhExpirationDate == undefined)
        errors["cnhExpirationDate"]="Empty cnhExpirationDate"

    if(cnhCategory == "" || cnhCategory == undefined)
        errors["cnhCategory"]="Empty cnhCategory"

    return { errors }

}

let create = async (data) => {

    const{
        user,
        cpf,
        rg,
        cellphone,
        phone,
        cnhNumber,
        cnhExpirationDate,
        cnhCategory,
        address
    } = data

    try{

        const userInfo = await new UserInfo({
            user,
            cpf,
            rg,
            cellphone,
            phone,
            cnhNumber,
            cnhExpirationDate,
            cnhCategory,
            address
        });

        await userInfo.save();
        
        return userInfo

    }catch(e){
        console.log(e)
        throw { message:"Error create address" }
    }
    
}

module.exports = {
    create,
    validate
};