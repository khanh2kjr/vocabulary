const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth.middleware')

const { checkIfUserIsLoggedIn, registerUser, loginUser } = require('../controllers/user.controller')

router.get('/', verifyToken, checkIfUserIsLoggedIn)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
