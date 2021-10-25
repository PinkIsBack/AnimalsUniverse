const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type: String,
    default: ''
  },
  city:{
    type: String,
    default: ''
  },
  phone:{
    type: String,
    require: true,
    default: ""
  },
  description: {
    type: String,
    require: false,
    default: ""
  },
  whishlist: [{
    ref: 'posts',
    type: Schema.Types.ObjectId
  }],
  posts:[{
    ref: 'posts',
    type: Schema.Types.ObjectId
  }],
  status: {
    type: Number,
    default: 2
  }

},{collection:"users"})

module.exports = mongoose.model('users', userSchema)