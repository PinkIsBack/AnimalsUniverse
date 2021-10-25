const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')


module.exports.analytics = async function(req, res) {
    try {
        const allOrders = await Order.find().sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)

        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

        const chart = Object.keys(ordersMap).map(label => {
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length


            return {label, order, gain}
        })

        res.status(200).json({average , chart})


    } catch (e) {
        errorHandler(res, e)
    }
}

function getOrdersMap(orders = []){
    const daysOrder = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if(date === moment().format('DD.MM.YYYY')){
            return
        }

        if(!daysOrder[date]){
            daysOrder[date] = []
        }

        daysOrder[date].push(order)
    })

    return daysOrder
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderPrice
    }, 0)
}