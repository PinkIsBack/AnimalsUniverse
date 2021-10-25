const Stat = require('../models/Statistics')
const errorHandler = require('../utils/errorHandler')

module.exports.getById = async function(req, res){
    try {
      const stat = await Stat.find({User: req.params.id})
      res.status(200).json(stat)
    } catch(e){
      errorHandler(res, e)
    }
}

module.exports.editInfo = async function(req, res) {
  const updated = await Stat.findOne({User: req.params.id})
  if(req.body.dog){
    updated.dog += 1
  }
  if(req.body.cat){
    updated.cat += 1
  }
  if(req.body.others){
    updated.others += 1
  }
  if(req.body.food){
    updated.food +=  1 
  }
  if(req.body.toys){
    updated.toys += 1
}
  if(req.body.clothes){
    updated.clothes +=1
}

  try {
      const stat = await Stat.findOneAndUpdate(
          {User: req.params.id},
          {$set: updated},
          {new: true}
      )
      stat.save()
      res.status(200).json(stat)
  } catch (e) {
      errorHandler(res, e)
  }
}


