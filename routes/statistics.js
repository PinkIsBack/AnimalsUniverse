const passport = require('passport')
const express = require('express')
const controller = require('../controllers/statistics')
const router = express.Router() 

router.get('/:id',passport.authenticate('jwt', {session: false}),controller.getById)
router.patch('/:id',passport.authenticate('jwt', {session: false}),controller.editInfo)

module.exports = router