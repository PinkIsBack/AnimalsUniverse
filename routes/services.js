const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/services')
const router = express.Router() 


router.get('/',controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createService)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editService)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteService)



module.exports = router