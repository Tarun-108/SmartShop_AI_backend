const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, `Please enter a valid email`]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password length is 8']
    }
});

//fxn call after new doc saved in DB
authSchema.post('save', function(doc, next){
    console.log('New user is created and saved', doc);
    next();
})

// fxn call before new doc is saved in DB
authSchema.pre('save', async function ( next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//static method to login user
authSchema.statics.login = async function(email, password){
    const auth = await this.findOne({email});
    if(auth){
        const valid = bcrypt.compare(password, auth.password);
        if(valid){
            return auth;
        }
        throw Error(`incorrect password`);
    } throw Error(`incorrect email`);
}

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;