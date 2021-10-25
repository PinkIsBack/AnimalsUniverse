const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
    try {
        const products = await Product
        .find()
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res){
    try {
      const product = await Product.find({_id:req.params.id})
      res.status(200).json(product)
    } catch (e) {
      errorHandler(res, e)
    }
}

module.exports.createProduct = async function(req, res) {
    const product  = new Product({
        Animal: req.body.Animal,
        Name: req.body.Name,
        Price: req.body.Price,
        Category: req.body.Category,
        Description: req.body.Description,
        ImgUrl: req.file ? req.file.path : ''
    })
    try {
        await product.save()
        res.status(201).json({
            message: 'Product created'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateProduct = async function(req, res) {
    const updated = {
        Animal: req.body.animal,
        Name: req.body.name,
        Price: req.body.price,
        Description: req.body.description,
        Category: req.body.category,
        Manufacture: req.body.manufacture
    }

    if(req.file){
        updated.ImgUrl = req.file.path
    }
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removeProduct = async function(req, res) {
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Product deleted successfully'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}