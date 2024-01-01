const mongoose = require('mongoose')

const schema = mongoose.Schema

const loginSchema = new schema({
    email:{type:String},
    password:{type:String},       
      
})

const loginModel = mongoose.model('login_tb',loginSchema)

module.exports = loginModel