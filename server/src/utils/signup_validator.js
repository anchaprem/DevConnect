const validator = require("validator")

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter a valid first or last name")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid Email ID")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password")
    }
}

const validateEditProfile=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","photoUrl","gender","gender","age","about","skills"];
    const isAllowed=Object.keys(req.body).every(field=>{
        return allowedEditFields.includes(field);
    });
    return isAllowed;
}




module.exports = {
    validateSignupData,validateEditProfile
}