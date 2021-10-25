const mongoose = require('mongoose')

let statisticSchema = new mongoose.Schema({
    User: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    },
    dog: {
        type: Number,
        default: 0
    },
    cat: {
        type: Number,
        default: 0
    },
    others: {
        type: Number,
        default: 0
    },
    food: {
        type: Number,
        default: 0
    },
    toys: {
        type: Number,
        default: 0
    },
    clothes: {
        type: Number,
        default: 0
    }
}, { collection: "statistics" })


module.exports = mongoose.model('statistics', statisticSchema)