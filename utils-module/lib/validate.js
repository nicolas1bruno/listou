function validateNumber(value, errors, attribute, length) {
    if(!value) {
        errors[attribute] = "Invalid value for " + attribute;
        return errors;
    }

    if (isNaN(value)) {
        errors[attribute] = attribute + " is not a number";
        return errors;
    }

    if (value < 0) {
        errors[attribute] = "only positive values are allowed";
        return errors;
    }

    if (length > 0) {
        if(value.length != length) {
            errors[attribute] = "check the " + attribute + " length";
            return errors;
        }
    }

    return errors;
}

module.exports.validateNumber = validateNumber;