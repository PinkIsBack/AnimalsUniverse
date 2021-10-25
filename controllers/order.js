const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const keys = require('../config/keys')

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: keys.email.address,
    pass: keys.email.pass
  }
});
const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions));

module.exports.getAll = async function(req, res) {
    try {
        const order = await Order.find()
        res.status(200).json(order)
      } catch (e) {
        errorHandler(res, e)
      }
}  

module.exports.getByUser = async function(req, res) {
    try {
        const order = await Order.find({user: req.params.id})
        res.status(200).json(order)
    } catch (e){
      errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const lastOrder = await Order
          .findOne({user: req.user.id})
          .sort({date: -1})
    
        const maxOrder = lastOrder ? lastOrder.order : 0
    
        const order = await new Order({
          list: req.body.list,
          user: req.user.id,
          order: maxOrder + 1,
          price: req.body.price
        }).save()
        
        const reciver = await User.findOne({_id: req.user.id})
        
        var mailOptions = {
          from: 'example202110@gmail.com',
          to: reciver.email,
          subject: 'Thanks for buying!!!',
          template: 'email',
          context: {
            price: req.body.price
          }
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        res.status(201).json(order)
      } catch (e) {
        errorHandler(res, e)
      }
}