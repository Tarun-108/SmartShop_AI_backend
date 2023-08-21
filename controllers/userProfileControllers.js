const User = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require("axios");
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {name: '', authId: '', email: ''};

    // invalid auth id
    if(err.message === 'invalid auth'){
        errors.authId = "Inavlid auth Id provided";
    }

    // incorrect email or password
    if(err.message === 'user not created'){
        errors.email = "User profile is not created, please complete the profile!";
    }

    //empty email provided
    if(err.message === 'empty email'){
        errors.email = "Please enter a email";
    }

    // Duplicate email
    if(err.code === 11000){
        errors.email = 'Entered email already registered'
        return errors
    }

    // validation
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


// POST request to create new user profile
module.exports.create_post = async (req, res) => {
    const {name, authId, email, age, gender, phone} = req.body

    try{
        const response = await User.create({name, authId, email, age, gender, phone});
        res.status(201).json(response);
    }catch (err){
        const errors = handleErrors(err)
        res.status(400).json({errors: errors});
    }

}

// POST request to get user
module.exports.getUser_post = async (req, res) => {
    const {email} = req.body

    try{
        const response = await User.getUser(email);
        res.status(200).json(response);
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors: errors});
    }

}

module.exports.addPurchases = async (req, res) => {
    const email = req.email;
    const {productsPurchased} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user.purchaseList){
            user.purchaseList = [];
        }
        productsPurchased.forEach(elem => {
           user.purchaseList.push(elem);
           if(user.purchaseList.length > 10) user.purchaseList.shift();
        });
        // console.log(user.purchaseList);
        const response = await axios.post(process.env.AI_URL+"/update_encodings", {"inp": user.purchaseList});
        // console.log(response.data);
        user.embeddings = response.data;
        await user.save();
        res.status(200).json({msg: "user embedding updated"});
    }catch (err) {
        console.log(err.message);
        res.status(400).json({msg: err.message});
    }

}
