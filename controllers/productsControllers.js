const User = require("../models/user");
const {mongoose} = require('mongoose');
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {msg:''};

    errors.msg = err.message;

    return errors;
}


module.exports.getAll = async (req, res) => {

}

