const mongoose = require('mongoose')
const Schema = mongoose.Schema


let serviceSchema = new mongoose.Schema({
    type:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: false
    },
    name:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    web:{
        type: String,
        require: false
    },
    address:{
        type: String,
        require: true
    },

},{collection:"services"})



module.exports = mongoose.model('services', serviceSchema)