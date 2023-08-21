const User = require("../models/user");
const {mongoose} = require('mongoose');
const axios = require("axios");
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

module.exports.getRecommended = async  (req, res) => {
    const {imageEncoding} = req.body;
    try{
        const response = await axios.post(process.env.AI_URL+'/pick', {inp: imageEncoding});
        const productArray = response.data;
        const final_resp = [];
        for (let i = 0; i < productArray.length; i += 5) {
            const product = {
                imageEncoding: productArray[i],
                productId: productArray[i + 1],
                productName: productArray[i + 2],
                productPrice: productArray[i + 3],
                discountedPrice: productArray[i + 4]
            };
            final_resp.push(product);
        }
        res.status(200).send(final_resp);
    }catch (err) {
        res.status(200).send(err.message);
    }
}

module.exports.getHomeProducts = async  (req, res) => {
    const email = req.email;
    try{
        const user = await User.findOne({email});
        console.log(user.embeddings.length);
        console.log(typeof(user.embeddings[0]));
        const response = await axios.post(process.env.AI_URL+'/recommend_homepage', {inp: user.embeddings});
        const productArray = response.data;
        console.log(typeof(productArray), productArray.length);
        const final_resp = [];
        for (let i = 0; i < productArray.length; i += 5) {
            const product = {
                imgUrl: "data:image/png;base64," + productArray[i],
                _id: productArray[i + 1],
                title: productArray[i + 2],
                price: productArray[i + 3],
                discountedPrice: productArray[i + 4]
            };
            final_resp.push(product);
        }
        res.status(200).send(final_resp);
    }catch (err) {
        console.log(err);
        res.status(200).send(err.message);
    }
}
