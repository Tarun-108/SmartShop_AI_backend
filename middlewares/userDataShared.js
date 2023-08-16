const User = require("../models/user");

const handleErrors = (err) => {

    let errors = {name: '', authId: '', email: '',  age: '', gender: '', phone: ''};

    // incorrect email or password
    if(err.message === 'user not created'){
        errors.email = "User profile is not created, please complete the profile!";
    }

    // validation
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const userDataShared = {
    getResponseData: async (email) => {
        // Perform some logic to generate the response data
        let res = {};
        try{
            const user = await User.getUser(email);
            res = {
                data: user,
                message: "User Profile"
            }
        }catch (err){
            const errors = handleErrors(err)
            res = {
                errors: errors
            }
        }
        return res;
    },
    createUser: async (req) => {

        const {name, authId, email, age, gender, phone} = req.body;

        try{
            const user = await User.create({name, authId, email, age, gender, phone});
            return {
                data: user,
                message: "User profile created"
            };
        }catch (err){
            const errors = handleErrors(err)
            return {errors: errors};
        }
    }
};

module.exports = userDataShared;