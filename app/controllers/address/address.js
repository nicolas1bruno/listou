const Address = require('../../models/address');

let validate = async (data) => {

    const{
        cep,
        address,
        number,
        residentialComplement,
        neighborhood,
        city,
        uf

    } = data

    errors = {}

    if(cep == "" || cep == undefined)
        errors["cep"]="Empty cep"

    if(address == "" || address == undefined)
        errors["address"]="Empty address"

    if(number == "" || number == undefined)
        errors["number"]="Empty number"

    if(neighborhood == "" || neighborhood == undefined)
        errors["neighborhood"]="Empty neighborhood"

    if(city == "" || city == undefined)
        errors["city"]="Empty city"

    if(uf == "" || uf == undefined)
        errors["uf"]="Empty uf"

    return { errors }

}

let create = async (data) => {
    
    const{
        cep,
        address,
        number,
        residentialComplement,
        neighborhood,
        city,
        uf,
        latitude,
        longitude
    } = data

    try{
        const newAddress = await new Address({
            cep,
            address,
            number,
            residentialComplement,
            neighborhood,
            city,
            uf,
            latitude,
            longitude
        });
    
        await newAddress.save();
    
        return newAddress
    }catch(e){
        console.log(e)
        throw { message:"Error create address" }
    }
    
}

let findAddressById  =  async (req, res) => {
    try {
        const { id } = req.params;
    
        const address = await Address.findById(id);
        
        return res.send({
            id: address._id,
            cep: address.cep,
            address: address.address,
            number: address.number,
            residentialComplement: address.residentialComplement,
            neighborhood: address.neighborhood,
            city: address.city,
            uf: address.uf,
            latitude: address.latitude,
            longitude:  address.longitude 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error getting address"});
    }
}


module.exports = {
    create,
    validate,
    findAddressById
};