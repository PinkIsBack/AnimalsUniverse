const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    User: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    },
    UserName: {
        type: String,
        require: true
    },
    Age: {
      type: Number,
      required: true
    },
    Gender:{
      type: String,
      require: true
    },
    Animal: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: false
    },
    Description: {
        type: String,
        required: true
    },
    ImgSrc: {
        type: String,
        default: '',
        required: false
    },
    City: {
        type: String,
        required: true
    },
    Action: {
        type: String,
        required:true,
        default: 'Sale'
    }
  },{collection: "posts"})
  
  module.exports = mongoose.model('posts', postSchema)