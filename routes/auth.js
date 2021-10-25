const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()


router.post('/login', controller.login)

router.get('/getAll',controller.getAll)
router.post('/register', controller.register)
router.patch('/password/:userId', controller.changePassword)

module.exports = router