function build(value, filtters, attribute) {
    if (value) {
        if(value.from && value.to) {
            filtters[attribute] = {
                $gte: value.from,
                $lte: value.to
            }            
        } else if(value.from) {
            filtters[attribute] = {
                $gte: value.from
            }            
        } else if(value.to) {
            filtters[attribute] = {
                $lte: value.to
            }
        } else if(value.equals) {
            filtters[attribute] = {
                $eq: value.equals
            }
        }
    }

    return filtters;
}

module.exports.build = build;