const mongoose = require('mongoose')

let productShema = new mongoose.Schema({
    Animal:{
        type: String,
        require: true
    },
    Name:{
        type: String,
        require: true
    },
    Price:{
        type: Number,
        require: true
    },
    Category:{
        type: String,
        require: true
    },
    Description:{
        type: String,
        require: true
    },
    ImgUrl:{
        type: String,
        default: ''
    }
},{collecetion: "products"})




module.exports = mongoose.model('products', productShema)