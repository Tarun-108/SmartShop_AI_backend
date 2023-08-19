const mongoose = require('mongoose');
const {isEmail} = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your full name'],
    },
    authId: {
        type: String,
        required: [true, 'Auth Id not provided'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, `Please enter a valid email`]
    },
    age: {
        type: Number,
        required: [true, 'Please enter age'],
    },
    gender: {
        type: String,
        required: [true, 'Please enter gender'],
    },
    phone:{
        type: String,
        required: false
    },
    chatFeed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatBoxSchema'
    }],
    embeddings: {
        type: String,
        default: ""
    }
});

//static method to login user
userSchema.statics.getUser = async function(email){
    if(email){
        const user = await this.findOne({email});
        if(user){
            return user;
        } throw Error(`user not created`);
    } throw Error('empty email');

}

const User = mongoose.model('user', userSchema);

module.exports = User;