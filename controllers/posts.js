const Post = require('../models/Post')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const post = await Post
    .find()
    .skip(+req.query.offset)
    .limit(+req.query.limit)
    res.status(200).json(post)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getByUser = async function(req, res){
  try {
    const post = await Post.find({User: req.params.userId})
    res.status(200).json(post)
  } catch(e){
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res){
  try {
    const post = await Post.find({_id:req.params.id})
    res.status(200).json(post)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const user = await User.findOne({_id: req.user.id})
  const post = new Post({
    Name: req.body.Name,
    User: req.user.id,
    UserName: user.userName ,
    Age: req.body.Age,
    Gender: req.body.Gender,
    Animal: req.body.Animal,
    Price: req.body.Price ? req.body.Price : 0,
    Description: req.body.Description,
    ImgSrc: req.file ? req.file.path : '',
    Action: req.body.Action ? req.body.Action : 'Sale',
    City: req.body.City
  })
  

  try {
    await post.save()
    user.posts.push(post)
    user.save()
    res.status(201).json({
      message: 'Post created'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  await Post.updateOne({id: req.params.id}, {$set: req.body}, 
    (error, data) => {
      res.status(200).json(data)
    }
    )
}

module.exports.delete = async function(req, res) {
  await Post.findByIdAndRemove({_id: req.params.id}),
  (error, data) => {
    res.status(200).json(data)
  }
}
