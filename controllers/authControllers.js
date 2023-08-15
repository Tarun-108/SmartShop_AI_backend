const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const userDataShared = require("../middlewares/userDataShared");
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: '', msg: ''};

    errors.msg = err.message;

    if(err.message.includes('timed out')){
        errors.msg = "Slow internet connection!";
    }

    // incorrect email or password
    if(err.message === 'incorrect email'){
        errors.email = "Entered email is not registered! Please register to continue";
    }
    if(err.message === 'incorrect password'){
        errors.password = "Wrong password entered";
    }

    // incorrect email or password
    if(err.message === 'user not created'){
        errors.email = "User profile is not created, please complete the profile!";
    }

    // Duplicate email
    if(err.code === 11000){
        errors.email = 'Entered email already registered'
        return errors
    }

    // validation
    if(err.message.includes('auth validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 7*24*60*60;

const createToken = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY_JWT, {
        expiresIn: maxAge
    });
}

module.exports.register_post = async (req, res) => {
    const {email, password} = req.body

    try{
        const auth = await Auth.create({email, password});
        const token = createToken(auth._id, auth.email);
        req.body.authId = auth._id;
        const user = await userDataShared.createUser(req);
        res.status(201).json({data: {
                token: token,
                expiresInSec: maxAge,
                authId: auth._id,
                user: user,
                message: "User Registered"
            }
        });
    }catch (err){
        const errors = handleErrors(err)
        res.status(400).json({errors: errors});
    }

}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body

    try{
        const auth = await Auth.login(email, password);
        const user = await userDataShared.getResponseData(email);
        const token = createToken(auth._id, auth.email);
        res.status(200).json({data: {
                token: token,
                expiresInSec: maxAge,
                authId: auth._id,
                user: user,
                message: "User logged in"
            }
        });
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors: errors});
    }

}