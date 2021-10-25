const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/posts')
const router = express.Router() 


router.get('/', controller.getAll)
router.get('/:userId',controller.getByUser)
router.get('/m/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}),upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}),upload.single('image'), controller.update)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.delete)





module.exports = router