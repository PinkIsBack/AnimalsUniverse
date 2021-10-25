const Service = require('../models/Service')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const service = await Service.find()
    res.status(200).json(service)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res){
  try {
    const serv = await Service.find({_id:req.params.id})
    res.status(200).json(serv)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.createService = async function(req, res) {
    const serv = new Service({
        name: req.body.name,
        img: req.file ? req.file.path : '',
        type: req.body.type ,
        address: req.body.address,
        phone: req.body.phone,
        web : req.body.web,
      })
      try {
          serv.save()
          res.status(201).json({
            message: 'Service created'
          })
      } catch (e) {
          errorHandler(res, e)
      }
}

module.exports.editService = async function(req, res) {
  await Service.updateOne({id: req.params.id}, {$set: req.body}, 
    (error, data) => {
      res.status(200).json({
        message: 'Service updated'
      })
    }
    )
}

module.exports.deleteService = async function(req, res) {
    
        await Service.findByIdAndRemove({_id: req.params.id}),
        (error, data)=>{
            res.status(200).json(data)
        }
}

