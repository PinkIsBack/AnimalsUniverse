const User = require('../models/User')
const Post = require('../models/Post')
const errorHandler = require('../utils/errorHandler')
const Stat = require('../models/Statistics')


module.exports.getById = async function(req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.addToWishList = async function (req, res) {
    const user = await User.findOne({ _id: req.params.id })
    const post = await Post.findOne({ _id: req.body._id })
   try{
        user.whishlist.push(post)
        user.save()
        res.status(200).json(user)
    }
    catch(e) {
      errorHandler(res, e)
    }
    

}

module.exports.editProfile = async function(req, res) {
    const updated = {}
    if(req.body.userName){
        updated.userName = req.body.userName
    }
    if(req.body.phone){
        updated.phone = req.body.phone
    }
    if(req.body.city){
        updated.city = req.body.city
    }
    if(req.body.description){
        updated.description = req.body.description 
    }
    if(req.file) {
        updated.image = req.file.path
    }
    if(req.body.status){
        updated.status = req.body.status
    }
    if(req.body.email){
        updated.email = req.body.email
    }
    
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        user.save()
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removeProfile = async function(req, res) {
    try {
        
        await User.findOneAndDelete({_id:req.params.id})
        await Stat.findOneAndDelete({User:req.params.id})
        await Post.findByIdAndDelete({User:req.params.id})

        res.status(200).json("Deleted succesfully")
    } catch (e) {
        errorHandler(res, e)
    }
}


