const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const Stat = require('../models/Statistics')


module.exports.getAll = async function(req, res) {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    if(candidate.status!=3){
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      const userId = candidate.id
      const status = candidate.status

      res.status(200).json({
        token: `Bearer ${token}`,
        userId: `${userId}`,
        status: `${status}`
      })
    } else {
      res.status(401).json({
        message: 'Wrong password.Try again.'
      })
    }
  } else {
    res.status(423).json({
      message: 'User was banned!'
    })
  }
} else{
  res.status(404).json({
    message: 'User with this email is not exist.'
  })
}
}

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})
  const UserName = await User.findOne({userName: req.body.userName})
  if (candidate) {
    res.status(409).json({
      message: 'Try another email.'
    })
  }else if(UserName) {
    res.status(409).json({
      message: 'Try anather UserName.'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    const stat = new Stat({
      User: user._id,
      interests: [
        {
          dog: 0,
          cat: 0,
          others: 0,
          food: 0,
          toys: 0,
          clothes: 0
        }
      ]
    })
    
    try {
      await user.save()
      await stat.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}

module.exports.getUserId = async function(req, res) {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user)
    res.status(200).json(user._id)
  } catch (e) {
    errorHandler(res, e)
  }
} 
module.exports.changePassword = async function (req, res) {
  try {
    const candidate = await User.findOne({ _id: req.params.userId })
    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.OldPassword, candidate.password)
      if (passwordResult) {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.NewPassword, salt)
        candidate.password = password
        candidate.save()
        res.status(200).json({
          message: 'Password updated'
        })
      } else {
        res.status(201).json({
          message: 'Current password incorect'
        })
      }
    }
  } catch (e) {
    errorHandler(res, e)
  }
}
