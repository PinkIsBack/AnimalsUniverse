const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()
const passport = require('passport')

router.get('/', passport.authenticate('jwt', {session: false}), controller.analytics)


module.exports = router