const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true
    }
});

//  static login method
userSchema.statics.login = async function(email, password) {

    // validation
    if(!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({email})


    if(!user) {
        throw Error('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);
    

    if(!match) {
        throw Error('Incorrect password');
    }

    return user;

}

//  static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if(!email || !password) {
        throw Error('All fields are required');
    }
    if(!validator.isEmail(email)) {
        throw Error('Invalid email');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exist = await this.findOne({email});

    if(exist) {
        throw Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;

}



module.exports = mongoose.model('User', userSchema)

