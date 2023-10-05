const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a userName address'],
    },
    email:{
        type:String,
        required:[true,'please enter a email address'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid Email']
    },
    password:{
        type:String,
        required:[true,'please enter a email address'],
        minLength:[6,'minimum password length is 6 caractor']
    },
})

const User = mongoose.model('user',userSchema)
module.exports = User 