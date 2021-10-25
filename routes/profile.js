const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/profile')
const router = express.Router() 



router.get('/:id', controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.editProfile)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.removeProfile)
router.patch('/whish/:id',passport.authenticate('jwt', {session: false}), controller.addToWishList)


module.exports = router