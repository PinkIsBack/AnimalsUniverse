const mongoose = require('mongoose')
const Schema = mongoose.Schema

let orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  price: {
    type: Number,
    require: true
  }
},{collection: "orders"})

module.exports = mongoose.model('orders', orderSchema)