const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/services')
const rateLimit = require('express-rate-limit')
const router = express.Router() 

const getAllLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs on this route
})

router.get('/', getAllLimiter, controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createService)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editService)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteService)



module.exports = router