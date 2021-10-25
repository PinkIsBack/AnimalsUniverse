const passport = require('passport')
const express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/shop')
const router = express.Router() 



router.get('/', controller.getAll)
router.get('/:id',controller.getById)
router.post('/',  passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createProduct )
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateProduct)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeProduct)

module.exports = router