const UserController = require('../user/user');
const UserInfoController = require('../userInfo/userInfo');
const AddressController = require('../address/address');
const UserInfo = require('../../models/userInfo');

let register = async (req, res) => {

    const data = req.body

    const userErrors = await UserController.validate(data)
    const userInfoErrors = await UserInfoController.validate(data)
    const addressErrors = await AddressController.validate(data)
    const errors = {...userErrors.errors, ...userInfoErrors.errors, ...addressErrors.errors}
    
    if(Object.keys(errors).length > 0)
        return res.status(406).send({
            errors, 
            message:"Error register user"
        })

    try{
        const user = await UserController.create(data)
        const address = await AddressController.create(data)
        const userInfo = await UserInfoController.create({...data,user,address})

        return await res.send({
            id:user._id,
            name:user.name,
            email:user.email,
            cpf:userInfo.cpf,
            rg:userInfo.rg,
            cellphone:userInfo.cellphone,
            phone:userInfo.phone,
            cnhNumber:userInfo.cnhNumber,
            cnhExpirationDate:userInfo.cnhExpirationDate,
            cnhCategory:userInfo.cnhCategory
        });

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

let getUser = async (req, res) => {
    
    try{

        const { userId } = req;
        const userInfo = await UserInfo
                            .findOne({user:userId})
                            .populate("user")
                            .populate("address")

        return res.send({
            email: userInfo.user.email,
            name: userInfo.user.name,
            cpf: userInfo.cpf,
            rg: userInfo.rg,
            phone: userInfo.phone,
            cellphone: userInfo.cellphone,
            cnhNumber: userInfo.cnhNumber,
            cnhCategory: userInfo.cnhCategory,
            cnhExpirationDate: userInfo.cnhExpirationDate,
            uf:userInfo.address.uf,
            city:userInfo.address.city,
            cep: userInfo.address.cep,
            address: userInfo.address.address,
            residentialComplement: userInfo.address.residentialComplement,
            neighborhood: userInfo.address.neighborhood,
            number: userInfo.address.number
        })
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }

}



let setUser = async (req, res) => {

    try{
        const { userId } = req;
        const userInfo = await UserInfo
                            .findOne({user:userId})
                            .populate("user")
                            .populate("address")  
        const {
            name,
            password,
            cpf,
            rg,
            phone,
            cellphone,
            cnhNumber,
            cnhCategory,
            cnhExpirationDate,
            uf,
            city,
            cep,
            address,
            residentialComplement,
            neighborhood,
            number
        } = req.body

        if(name){ userInfo.user.name = name }
        if(password){ userInfo.user.password = password }
        if(cpf){ userInfo.cpf = cpf }
        if(rg){ userInfo.rg = rg }
        if(phone){ userInfo.phone = phone }
        if(cellphone){ userInfo.cellphone = cellphone }
        if(cnhNumber){ userInfo.cnhNumber = cnhNumber }
        if(cnhCategory){ userInfo.cnhCategory = cnhCategory }
        if(cnhExpirationDate){ userInfo.cnhExpirationDate = cnhExpirationDate }
        if(uf){ userInfo.address.uf = uf }
        if(city){ userInfo.address.city = city }
        if(cep){ userInfo.address.cep = cep }
        if(address){ userInfo.address.address = address }
        if(residentialComplement){ userInfo.address.residentialComplement = residentialComplement }
        if(neighborhood){ userInfo.address.neighborhood = neighborhood }
        if(number){ userInfo.address.number = number }

        userInfo.save()
        userInfo.user.save()
        userInfo.address.save()

        return res.send({
            email: userInfo.user.email,
            name: userInfo.user.name,
            cpf: userInfo.cpf,
            rg: userInfo.rg,
            phone: userInfo.phone,
            cellphone: userInfo.cellphone,
            cnhNumber: userInfo.cnhNumber,
            cnhCategory: userInfo.cnhCategory,
            cnhExpirationDate: userInfo.cnhExpirationDate,
            cep: userInfo.address.cep,
            uf:userInfo.address.uf,
            city:userInfo.address.city,
            address: userInfo.address.address,
            residentialComplement: userInfo.address.residentialComplement,
            neighborhood: userInfo.address.neighborhood,
            number: userInfo.address.number
        })

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


module.exports = {
    register,
    getUser,
    setUser
};